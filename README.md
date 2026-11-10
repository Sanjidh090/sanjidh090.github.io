# sanjidh090.github.io

My personal site. It is plain HTML, CSS and JavaScript, so there is nothing to
build or install. GitHub Pages serves whatever is on the `main` branch, and a
change goes live a minute or two after you commit it.

## Changing the site

**Almost everything is in [`content.js`](content.js).** Open it on GitHub, click
the pencil icon, edit, and commit.

| I want to...                         | Do this                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------- |
| Add a paper                          | Copy one `{ ... }` block inside `papers` and change the text            |
| Add a project, model or dataset      | Copy a block inside `builds`                                            |
| Add a role                           | Copy a block inside `path`                                              |
| Add a competition result             | Copy a block inside `results`                                           |
| Add an article from Medium or DEV    | Copy a block inside `writing`                                           |
| Change the headline, intro or email  | Edit `headline`, `intro`, `email` near the top                          |
| Change the terminal lines            | Edit `terminal`                                                         |
| Change the cards under the hero      | Edit `stats`                                                            |
| Add my photo                         | Put the image in `assets/img/`, then set `about.photo` to its path      |
| Replace my CV                        | Upload the new PDF over `assets/cv/Sanjid_Hasan_CV.pdf`                 |
| Change the accent colour             | Change `--accent` at the top of `assets/site.css`                       |

The order of the blocks in `content.js` is the order on the page.

If the page goes blank after an edit, a quote, comma or bracket is missing in
`content.js`. Compare with the block above the one you edited.

## Research notes

Notes live in the `research/` folder. **A new note needs no change to
`content.js`.**

1. Make a new folder under `research/`, for example `research/noise-bench/`.
   Use lowercase letters, numbers and dashes in the name.
2. Add a `README.md` inside it and write the note in Markdown.
3. Commit. The note appears under "Research notes" on the home page and opens
   at `note.html?n=noise-bench`.

Details:

- The card title is the first `# Heading` in the README. If there is none, the
  folder name is used. To set a different title, add a line to `noteTitles` in
  `content.js`.
- The card text is the first 150 characters of the note.
- Other files in the folder (PDFs, images) are listed at the bottom of the note
  page. Images can be used in the Markdown with a relative path, for example
  `![chart](chart.png)`.
- The list of folders comes from GitHub, so a new note can take a few minutes
  to show up. If GitHub cannot be reached, the site falls back to the
  `notesFallback` list in `content.js`.

## Files

```
index.html        the home page layout (rarely needs editing)
note.html         the page that displays one research note
content.js        ALL the text and links on the home page
assets/site.css   colours, fonts and layout
assets/site.js    turns content.js into the page
assets/cv/        CV
assets/img/       images
research/         research notes, one folder each
blog.html         redirects to the notes section (old link)
```

## Previewing on my computer

```
python -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` by double-clicking also
works, except for the research notes.
