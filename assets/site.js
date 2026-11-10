/* Builds the page from content.js. You should not need to edit this file. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var ext = function (url) { return /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : ""; };
  var put = function (id, html) { var el = $(id); if (el) el.innerHTML = html; };
  var map = function (list, fn) { return (list || []).map(fn).join(""); };

  /* ---------- Shared: research notes from the /research folder ---------- */
  function pretty(slug) {
    return slug.replace(/[-_]+/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }
  function isReadme(name) { return /^readme\.md$/i.test(name); }

  // Returns { slug: { readme: "README.md", files: ["a.pdf", ...] } }
  function listNotes() {
    var key = "notes:" + S.repo;
    try {
      var cached = JSON.parse(sessionStorage.getItem(key) || "null");
      if (cached) return Promise.resolve(cached);
    } catch (e) {}
    var api = "https://api.github.com/repos/" + S.repo + "/git/trees/" + (S.branch || "main") + "?recursive=1";
    return fetch(api)
      .then(function (r) { if (!r.ok) throw new Error("github " + r.status); return r.json(); })
      .then(function (data) {
        var notes = {};
        (data.tree || []).forEach(function (item) {
          var m = /^research\/([^/]+)\/([^/]+)$/.exec(item.path);
          if (!m || item.type !== "blob") return;
          var n = (notes[m[1]] = notes[m[1]] || { readme: "", files: [] });
          if (isReadme(m[2])) n.readme = m[2];
          else if (!/\.html?$/i.test(m[2])) n.files.push(m[2]);
        });
        Object.keys(notes).forEach(function (k) { if (!notes[k].readme) delete notes[k]; });
        try { sessionStorage.setItem(key, JSON.stringify(notes)); } catch (e) {}
        return notes;
      })
      .catch(function () {
        var notes = {};
        (S.notesFallback || []).forEach(function (p) {
          var parts = p.split("/");
          if (parts.length === 2) notes[parts[0]] = { readme: parts[1], files: [] };
        });
        return notes;
      });
  }
  function noteMeta(slug, md) {
    var title = (S.noteTitles || {})[slug];
    var h = /^#\s+(.+)$/m.exec(md);
    if (!title) title = h ? h[1].trim() : pretty(slug);
    var body = md
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/^#.*$/gm, " ")
      .replace(/^\*\*(Author|Date):.*$/gim, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`>#]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    var excerpt = body.length > 150 ? body.slice(0, 150).replace(/\s+\S*$/, "") + "…" : body;
    return { title: title, excerpt: excerpt };
  }
  window.SITE_NOTES = { list: listNotes, meta: noteMeta, pretty: pretty, esc: esc };

  if (!$("hero-text")) return; // not the home page

  /* ---------- Top bar and hero ---------- */
  document.querySelectorAll("[data-logo]").forEach(function (el) {
    el.innerHTML = '<span class="accent">~/</span>' + esc(S.logo);
  });
  document.querySelectorAll("[data-mail]").forEach(function (el) { el.href = "mailto:" + S.email; });
  document.querySelectorAll("[data-cv]").forEach(function (el) { el.href = S.cv; });

  put("hero-text",
    '<p class="eyebrow">' + esc(S.eyebrow) + "</p>" +
    "<h1>" + esc(S.headline) + "</h1>" +
    '<p class="intro">' + esc(S.intro) + "</p>" +
    '<div class="row"><a class="btn primary" href="#research">See the research</a>' +
    '<a class="btn ghost" href="' + esc(S.cv) + '">Download CV</a></div>');

  put("term-body",
    map(S.terminal, function (t) {
      return '<div><div><span class="accent">$</span> ' + esc(t.cmd) + "</div>" +
        '<div class="out' + (t.highlight ? " hl" : "") + '">' +
        map(t.out, function (line) { return "<div>" + esc(line) + "</div>"; }) + "</div></div>";
    }) + '<div><span class="accent">$</span> <span class="cursor" aria-hidden="true"></span></div>');

  var wave = "";
  for (var i = 0; i < 80; i++) {
    var amp = Math.abs(Math.sin(i * 0.9) * 0.5 + Math.sin(i * 0.37 + 1) * 0.35 + Math.sin(i * 1.7) * 0.15);
    wave += '<span' + (i % 9 === 4 ? ' class="on"' : "") + ' style="height:' + Math.round(8 + amp * 88) + '%"></span>';
  }
  put("wave", wave);

  /* ---------- Cards ---------- */
  put("stats", map(S.stats, function (c) {
    return '<div class="card' + (c.wide ? " wide" : "") + (c.highlight ? " hl" : "") + '">' +
      '<div class="label">' + esc(c.label) + "</div>" +
      '<div class="value' + (c.small ? " small" : "") + '">' + (c.dot ? '<span class="dot" aria-hidden="true"></span>' : "") + c.value + "</div>" +
      (c.bars ? '<div class="bars">' + map(c.bars, function (b) {
        return '<div class="bar"><span>' + esc(b.label) + '</span><div><b' + (b.alt ? ' class="alt"' : "") +
          ' style="width:' + Number(b.pct) + '%"></b></div></div>';
      }) + "</div>" : "") +
      (c.chips ? '<div class="chips">' + map(c.chips, function (x) { return '<span class="chip">' + esc(x) + "</span>"; }) + "</div>" : "") +
      (c.text ? "<p>" + esc(c.text) + "</p>" : "") + "</div>";
  }));

  put("focus", map(S.focus, function (f, i) {
    return '<div><span class="num">0' + (i + 1) + "</span><h3>" + esc(f.title) + "</h3><p>" + esc(f.text) + "</p></div>";
  }));

  /* ---------- Papers ---------- */
  put("papers", map(S.papers, function (p) {
    var title = p.url ? '<a href="' + esc(p.url) + '"' + ext(p.url) + ">" + esc(p.title) + "</a>" : esc(p.title);
    return '<article class="card paper' + (p.featured ? " featured" : "") + '">' +
      '<div class="chips">' + map(p.badges, function (b) {
        return '<span class="chip ' + esc(b.kind || "outline") + '">' + esc(b.text) + "</span>";
      }) + "</div>" +
      "<h3>" + title + "</h3>" +
      '<p class="authors">' + esc(p.authors) + "</p>" +
      (p.summary ? '<p class="summary">' + esc(p.summary) + "</p>" : "") +
      ((p.links || []).length ? '<div class="links">' + map(p.links, function (l) {
        return '<a href="' + esc(l.url) + '"' + ext(l.url) + ">" + esc(l.label) + "</a>";
      }) + "</div>" : "") + "</article>";
  }));

  /* ---------- Builds ---------- */
  function buildCard(b, href) {
    var tag = href ? "a" : "div";
    return "<" + tag + ' class="card build"' + (href ? ' href="' + esc(href) + '"' + ext(href) : "") + ">" +
      '<span class="kind' + (b.hardware ? " hw" : "") + '">' + esc(b.kind) + "</span>" +
      '<span class="title">' + esc(b.title) + "</span>" +
      '<span class="text">' + esc(b.text) + "</span></" + tag + ">";
  }
  put("builds-grid", map(S.builds, function (b) { return buildCard(b, b.url); }));

  /* ---------- Notes (from the research folder) ---------- */
  put("notes-intro", esc(S.notesIntro));
  listNotes().then(function (notes) {
    var slugs = Object.keys(notes).sort();
    if (!slugs.length) { $("notes-block").hidden = true; return; }
    return Promise.all(slugs.map(function (slug) {
      return fetch("research/" + encodeURIComponent(slug) + "/" + encodeURIComponent(notes[slug].readme))
        .then(function (r) { return r.ok ? r.text() : ""; })
        .catch(function () { return ""; })
        .then(function (md) {
          var m = noteMeta(slug, md);
          var extra = notes[slug].files.length;
          return buildCard({
            kind: "note" + (extra ? " · " + extra + " file" + (extra > 1 ? "s" : "") : ""),
            title: m.title,
            text: m.excerpt,
          }, "note.html?n=" + encodeURIComponent(slug));
        });
    })).then(function (cards) { put("notes", cards.join("")); });
  });

  /* ---------- Timeline, results, writing, about, footer ---------- */
  put("path-intro", esc(S.pathIntro));
  put("path", map(S.path, function (r) {
    return "<div" + (r.current ? ' class="now"' : "") + '><div class="when">' + esc(r.when) + "</div>" +
      '<div class="role">' + esc(r.role) + '</div><div class="text">' + esc(r.text) + "</div></div>";
  }));

  put("results", map(S.results, function (r) {
    return '<div class="card result' + (r.wide ? " wide" : "") + (r.highlight ? " hl" : "") + '">' +
      '<span class="rank">' + esc(r.rank) + '</span><span class="event">' + esc(r.event) + "</span>" +
      '<span class="meta">' + esc(r.meta) + "</span></div>";
  }));

  put("writing", map(S.writing, function (w) {
    return '<a href="' + esc(w.url) + '"' + ext(w.url) + "><span>" + esc(w.title) + "</span><span>" + esc(w.where) + "</span></a>";
  }));

  var about = S.about || {};
  put("about",
    (about.photo ? '<img src="' + esc(about.photo) + '" alt="Portrait of ' + esc(S.name) + '">' : "") +
    "<div>" + map(about.paragraphs, function (p) { return "<p>" + esc(p) + "</p>"; }) + "</div>");

  put("contact-headline", esc(S.contactHeadline));
  put("mail-text", esc(S.email));
  put("profiles", map(S.profiles, function (p) {
    return '<a href="' + esc(p.url) + '"' + ext(p.url) + ">" + esc(p.label) + "</a>";
  }));
})();
