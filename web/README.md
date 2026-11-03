# Documentation site (Astro)

The Astro build of the documentation site. It's being built alongside the MkDocs
site, which stays live until this one replaces it. Deployment still only runs
from `.github/workflows/pages.yml` on `main`, which builds MkDocs.

## Commands

```sh
npm ci            # once, needs Node 22.23.4 or later
npm run dev       # local preview with live reload
npm run build     # static site in dist/, including the Pagefind search index
npm run check     # validates dist/: URLs, links, disclaimer, noindex and CSP
npm run preview   # serves dist/
```

## How it fits together

- `reference/` stays the single source of truth and is only read. Pages are built
  from `manifest.json`, the `*.operation.json` files and each model's Markdown, so
  the Markdown stays readable on GitHub without front matter.
- `scripts/prepare.mjs` runs before every build. It copies the Request Builder,
  operation files and Postman downloads into `public/`, and writes
  `assets/data/site-index.json` and `assets/data/jump-index.json`.
- Hand-written pages are Markdown in `src/pages/`, using the `Prose` layout. Keep code blocks unhighlighted, because highlighting adds inline styles that the CSP blocks.
- The Request Builder still lives in `docs-site/docs/assets/request-builder/`, with
  its tests in `docs-site/tests/`.
- Fonts are self-hosted from `public/fonts/`, under the licence in `OFL.txt`.

## Keeping search accurate

Pagefind indexes the HTML as built, and it doesn't treat inline tags or `<wbr>` as
word boundaries in the way a browser displays them:

- Put a space between inline elements in the index, such as `<dt>` and `<dd>`,
  otherwise neighbouring words merge and exact matches stop working.
- Never put `<wbr>` in an identifier in the HTML. `src/scripts/site.js` adds break
  opportunities in the browser instead.
