# Documentation site

The [Astro](https://astro.build/) site published at <https://mkto-ref.harrisonjennings.au/>, with search from
[Pagefind](https://pagefind.app/).

```sh
npm ci
npm run dev        # http://localhost:4321/
npm run build      # copies assets, builds the site and its search index into dist/
npm run check      # validates dist/: URLs, links, disclaimer, CSP and headers, secrets, titles, canonicals, sitemap
npm test           # Request Builder unit tests
npm run test:e2e   # browser tests against dist/ (needs `npx playwright install` once)
```

## Layout

| Path | What's in it |
|---|---|
| `builder/` | The Request Builder: plain JavaScript modules with no dependencies |
| `public/` | Fonts, images and other static files. `scripts/prepare.mjs` copies in the builder, `reference/` data and Postman files, which aren't committed here |
| `scripts/prepare.mjs` | Runs before each build, and writes the search and jump indexes |
| `scripts/headers.mjs` | Runs after each build, and writes `dist/_headers`: the CSP and security headers Cloudflare serves |
| `scripts/check.mjs` | Validates the built site |
| `scripts/readme/` | Draws the README's images |
| `site.json` | The published URL, also read by the Postman generator |
| `src/lib/reference.js` | The data layer: reads `../reference/` and gives pages what they need |
| `src/pages/` | One file per route. Reference routes come from the manifest |
| `src/layouts/`, `src/components/` | The page shell and its parts |
| `src/scripts/` | The small client behaviours: theme, panes, menu, filters, jump bar and search |
| `src/styles/site.css` | Everything visual. Tokens are at the top |
| `tests/builder/`, `tests/e2e/` | Unit tests and browser tests |
| `wrangler.jsonc` | The Cloudflare Worker that serves `dist/` |

## Pagefind

- Only `main[data-pagefind-body]` is indexed, and `data-pagefind-ignore` leaves parts out.
- `data-pagefind-filter="kind[data-kind], api[data-api], method[data-method]"` sets filters from attributes.
  Only one inline `key:value` is allowed, and it must come last.
- Call `pagefind.filters()` before searching, or filter counts come back empty.
- Inline tags aren't word boundaries, and Astro compresses whitespace, so adjacent inline elements need an
  explicit `{" "}`.
- `<wbr>` splits words in the index, so break opportunities in long paths are added in the browser.

## Search engines

Pages are indexable unless they pass `noindex` to `Base.astro`. The search page, the 404 page, the `ResponseOf…`
wrapper models and models no operation uses are excluded, and the sitemap leaves them out too. `npm run check`
fails on a duplicate title or description, a wrong canonical link, more than one `h1`, invalid structured data,
or a sitemap that doesn't match the indexable pages.

Titles use "… for Marketo Engage", as the site's own name does, so results don't read as Adobe's own
documentation.
