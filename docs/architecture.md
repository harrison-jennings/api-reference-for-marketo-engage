# Architecture

Everything starts from Adobe's specifications and flows one way. Generated files are committed, so
each step can be reviewed, and CI checks that they match what the generators produce.

```text
specs/                 Adobe's Swagger 2.0 and OpenAPI 3 files, unmodified
  ↓ scripts/build_marketo_api_reference.py
reference/             Markdown, one JSON file per operation, manifest.json
  ↓ scripts/build_postman_collection.mjs
postman/               collection and environment template
  ↓ web/scripts/prepare.mjs, astro build, pagefind
web/dist/              static site, validated by web/scripts/check.mjs
  ↓ .github/workflows/pages.yml
GitHub Pages           https://mkto-ref.harrisonjennings.au/
```

## The generator

`scripts/build_marketo_api_reference.py` uses only the Python standard library. It reads both
specification formats, normalises them into one model, and writes the Markdown pages, the
`*.operation.json` files and `reference/manifest.json`.

## The Request Builder

`web/builder/` is plain JavaScript with no dependencies. It's copied to `/assets/request-builder/` at
build time and only loads on the pages that use it.

| Module | What it does |
|---|---|
| `operation.js`, `schema.js` | Normalise an operation document and resolve its references |
| `validate.js` | Choose a control for each field and check values against the schema |
| `request.js`, `codegen.js` | Build the request and the cURL, JavaScript and Python samples |
| `mock.js`, `behaviour.js` | Generate mock responses that reflect the request |
| `body-fields.js` | The model behind the Fields view, with no DOM, so it can be tested on every body |
| `body-editor.js`, `ui.js`, `dom.js` | Draw the builder |
| `index.js` | Mount it on a page, and the Playground's operation picker |

The Postman exporter uses the same `operation.js` and `schema.js`, so a change to the builder's parsing
can change the collection. CI compares the collection byte for byte.

The JSON text is what a request is built from, in either body view. Reading the Fields view's tree gives
back the value it was built from, tested against every body in the reference, so switching views can
never change a request.

## The site

`web/` is an [Astro](https://astro.build/) site that renders to static files, with no client framework.

- **Pages** come from the data layer in `web/src/lib/reference.js`, which reads `reference/`.
- **URLs** match the reference's folder structure, and `web/scripts/check.mjs` checks every one exists.
- **Search** has two parts: the jump bar reads `jump-index.json` for exact names, and the search page
  uses [Pagefind](https://pagefind.app/) for full text, with filters.
- **Layout** is three panes from 1440px, a panel for navigation below that, and one pane with a Docs and
  Builder switch below 1100px. Every page has a working menu below 900px.

## Checks

| Check | Where | What it catches |
|---|---|---|
| Builder unit tests | `web/tests/builder/` | Every operation loads, mocks and produces samples, and credentials only appear as placeholders |
| Script tests | `scripts/tests/` | The generators and the change summaries |
| `reference-check`, `postman-check` | `Makefile` | Generated files that don't match their source |
| Postman runtime test | `scripts/postman-runtime/` | The collection, sent with Postman's own engine to a local server |
| Site check | `web/scripts/check.mjs` | Missing pages, broken links, the disclaimer, CSP, secrets, Postman files, titles, canonicals, sitemap |
| Browser tests | `web/tests/e2e/` | Navigation, search, the builder and accessibility, in Chromium, Firefox and WebKit |

## Deployment

`.github/workflows/pages.yml` runs on pull requests and on pushes to `main`. Pull requests build and
test without deploying. Pushes to `main` deploy `web/dist/` to GitHub Pages, and the custom domain is set
in the repository's Pages settings. The `main` ruleset requires the "Build and validate" check, so keep
that job name.

To roll back, revert the commit and let the workflow deploy the previous version.

## The weekly check

`.github/workflows/adobe-spec-check.yml` downloads Adobe's specifications every week. Anything that runs
third-party code does so with a read-only token, and the only job that can write runs no project code and
only commits changes inside `specs/`, `reference/` and the two Postman files. If anything changed, it opens
a draft pull request with a summary. A person has to mark it ready and merge it.
