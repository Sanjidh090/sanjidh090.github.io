#!/usr/bin/env python3
"""Encrypt a local research folder for the static GitHub Pages research vault.

Usage:
    python encrypt_research.py research research/private-archive.enc.json

Requires:
    python -m pip install cryptography

The script never uploads anything. It writes one encrypted JSON archive locally.
Keep your original files in a private backup before removing them from the public repo.
"""

from __future__ import annotations

import base64
import getpass
import json
import mimetypes
import os
import sys
from pathlib import Path

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

ITERATIONS = 600_000
OUTPUT_DEFAULT = Path("research/private-archive.enc.json")
EXCLUDED_DIRS = {".git", ".venv", "__pycache__", "node_modules"}
EXCLUDED_NAMES = {".DS_Store", "Thumbs.db"}


def b64(data: bytes) -> str:
    return base64.b64encode(data).decode("ascii")


def collect_files(source_dir: Path, output_path: Path) -> list[dict]:
    files: list[dict] = []
    output_resolved = output_path.resolve()

    for path in sorted(source_dir.rglob("*")):
        if not path.is_file() or path.is_symlink():
            continue
        if path.resolve() == output_resolved:
            continue
        if path.name in EXCLUDED_NAMES or path.name.endswith(".enc.json"):
            continue
        if any(part in EXCLUDED_DIRS or part.startswith(".") for part in path.relative_to(source_dir).parts):
            continue

        relative = path.relative_to(source_dir).as_posix()
        mime_type = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        files.append({
            "path": relative,
            "mime_type": mime_type,
            "data": b64(path.read_bytes()),
        })

    return files


def main() -> int:
    source_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("research")
    output_path = Path(sys.argv[2]) if len(sys.argv) > 2 else OUTPUT_DEFAULT

    if not source_dir.is_dir():
        print(f"Research folder not found: {source_dir}", file=sys.stderr)
        return 1

    files = collect_files(source_dir, output_path)
    if not files:
        print(f"No files found to encrypt in: {source_dir}", file=sys.stderr)
        return 1

    print(f"Found {len(files)} file(s).")
    passphrase = getpass.getpass("Create a strong archive passphrase: ")
    if len(passphrase) < 12:
        print("Use at least 12 characters; a longer unique passphrase is safer.", file=sys.stderr)
        return 1

    confirm = getpass.getpass("Confirm passphrase: ")
    if passphrase != confirm:
        print("Passphrases do not match.", file=sys.stderr)
        return 1

    manifest = {
        "version": 1,
        "files": files,
    }
    plaintext = json.dumps(manifest, ensure_ascii=False, separators=(",", ":")).encode("utf-8")

    salt = os.urandom(16)
    nonce = os.urandom(12)
    key = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=ITERATIONS,
    ).derive(passphrase.encode("utf-8"))

    ciphertext = AESGCM(key).encrypt(nonce, plaintext, None)

    payload = {
        "version": 1,
        "kdf": "PBKDF2-SHA256",
        "iterations": ITERATIONS,
        "cipher": "AES-256-GCM",
        "salt": b64(salt),
        "nonce": b64(nonce),
        "ciphertext": b64(ciphertext),
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")
    print(f"Encrypted archive written to: {output_path}")
    print("Keep the passphrase private. The original files are unchanged.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
