# Portfolio update package

This package is based on the HTML source supplied in the conversation. It preserves the original rose background (`#ac7777`), the original dark palette, the News & Updates internal scrolling ribbon, and the existing portfolio content.

## Files

- `index.html` — updated home page.
- `vault.html` — password-unlocked research archive interface.
- `encrypt_research.py` — local encryption tool for the existing `research/` folder.

## Changes in `index.html`

1. Preserves the original rose colour as the default theme.
2. Repairs the palette selector. Rose, Indigo, White and Parchment now work and persist after reload.
3. Adds a manual Light/Dark mode toggle. The default remains the original rose/light appearance; the selected mode is saved independently of the computer's system theme.
4. Keeps the News & Updates panel independently scrollable.
5. Adds the Moonshine Base BN live project link.
6. Adds the Cadrate ASR live project link.
7. Adds the Lipi-Ghor website link.
7. Adds Results and Contact to the main navigation.
8. Adds a discreet bird icon in the footer that opens `vault.html`.

## Set up the private research archive

The vault uses browser-side AES-256-GCM decryption. The passphrase is not sent to a server or stored by the page.

1. Keep a private backup of your original research folder.
2. Put `encrypt_research.py` in the repository root.
3. Install the one-time Python dependency:

   ```bash
   python -m pip install cryptography
   ```

4. Run this command from the repository root:

   ```bash
   python encrypt_research.py research research/private-archive.enc.json
   ```

5. Enter a long, unique passphrase when prompted.
6. Test the archive over HTTPS (GitHub Pages) after adding `vault.html` and the encrypted JSON file.
7. **Before publishing, remove unencrypted private notes and documents from the public repository.** Keep the originals in a private local backup or private storage. The encrypted file may remain in the public repository.

The encrypted file contains only ciphertext. The vault reads `research/private-archive.enc.json` after you enter the passphrase.

## Important notes

- A passphrase prompt alone is not security. The files must actually be encrypted; this package provides that encryption workflow.
- Use a strong, unique passphrase. If it is lost, the encrypted archive cannot be recovered.
- The vault displays text-based notes in the browser and offers downloads for PDFs and other files.
- The existing `blog.html`, `note.html`, `content.js`, `script.js`, `styles.css` and the contents of `research/` are not overwritten by this package. The only homepage source available for editing in this session was the HTML fragment supplied in chat, so the existing blog/note pages have not been audited or modified. Their references to files under `research/` should be checked before moving or removing any of those files.
- The HTML expects the existing image and CV assets to remain at their current paths.
