# API Reference for Marketo Engage

An independent reference for the Adobe Marketo Engage APIs, generated from Adobe's published Swagger
and OpenAPI specifications.

**Documentation site:** <https://mkto-ref.harrisonjennings.au/>

> [!NOTE]
> THIS PROJECT IS NOT AUTHORIZED, ENDORSED OR SPONSORED BY ADOBE, PUBLISHER OF ADOBE MARKETO
> ENGAGE. Adobe, Marketo and Marketo Engage are either registered trademarks or trademarks of Adobe
> in the United States and/or other countries. For authoritative documentation, see
> [Adobe's Marketo Engage developer documentation](https://developer.adobe.com/marketo-apis/).

## What's included

- **API reference:** Markdown pages for **388 operations** and **459 data models** across five
  APIs, readable here on GitHub or on the documentation site.
- **Machine-readable data:** a JSON file for every operation, and an index of all operations in
  [`reference/manifest.json`](reference/manifest.json).
- **Documentation site:** full-text search, and a Request Builder that turns any operation into a
  request, code samples and a mock response in the browser.
- **Source specifications:** the Adobe specifications the reference is generated from, in
  [`specs/`](specs/).
- **Generator:** a Python script, using only the standard library, that rebuilds the reference from
  the specifications.

This is a reference and tooling project, not an SDK.

## API coverage

| API | Operations | Models | Description |
|---|---:|---:|---|
| [Asset API](reference/asset/README.md) | 220 | 255 | Emails, templates, forms, landing pages, programs, smart campaigns, smart lists, files, folders, snippets, tokens and other marketing assets |
| [Core API](reference/core/README.md) | 147 | 175 | Leads, activities, campaigns, companies, custom objects, opportunities, lists, bulk operations and usage statistics |
| [Data Ingestion API](reference/data-ingestion/README.md) | 7 | 15 | High-volume ingestion of persons, companies, custom objects, list memberships and program members |
| [Identity API](reference/identity/README.md) | 2 | 2 | Authentication and access tokens |
| [User Management API](reference/user-management/README.md) | 12 | 12 | Users, invitations, roles, workspaces and access assignments |
| **Total** | **388** | **459** | |

## Using the reference

Start at the [reference index](reference/README.md), choose an API, then an endpoint group. Each
operation page documents:

- the HTTP method and endpoint path
- authentication requirements
- path, query, header and body parameters
- request and response schemas, with examples
- links to the data models it uses

Each operation also has a `*.operation.json` file next to its page, containing the operation and the
schemas it references. [`reference/manifest.json`](reference/manifest.json) indexes every operation
by specification, API, endpoint group, method, path, title and operation ID, with the paths to its
Markdown and JSON files, for use in search tools, API explorers and code generators.

## Documentation site

The [documentation site](https://mkto-ref.harrisonjennings.au/) publishes the same reference with
navigation and full-text search. Every operation page includes a **Request Builder** that:

- builds form controls for path, query, header and body parameters, validated against the schema
- generates the request URL and cURL, JavaScript (`fetch`) and Python (`requests`) samples
- generates a mock response for any documented status code, from the specification's example or
  the response schema

The Request Builder runs entirely in the browser. It never sends a request to Marketo, never asks
for a Client ID, Client Secret or access token, and its code samples use placeholders such as
`<ACCESS_TOKEN>`. The site's Content Security Policy only allows it to load its own files.

The site is built with [MkDocs](https://www.mkdocs.org/) and
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/), and deployed to GitHub Pages
from `main`.

## Development

### Prerequisites

| Tool | Version | Used for | Install |
|---|---|---|---|
| Git | Any | Cloning the repository | macOS: `xcode-select --install`; Debian/Ubuntu: `sudo apt install git` |
| Python | 3.10 or later, with `venv` | The generator and the site build | [python.org](https://www.python.org/downloads/) or `brew install python`; Debian/Ubuntu: `sudo apt install python3 python3-venv` |
| Node.js | 20 or later | Request Builder tests only; there is nothing to `npm install` | [nodejs.org](https://nodejs.org/) or `brew install node` |
| Make | Any | Running the tasks below | macOS: `xcode-select --install`; Debian/Ubuntu: `sudo apt install make` |

On Windows, use [WSL](https://learn.microsoft.com/windows/wsl/install) and follow the Debian/Ubuntu
instructions.

### Set up

```bash
git clone https://github.com/harrison-jennings/api-reference-for-marketo-engage.git
cd api-reference-for-marketo-engage
make setup
```

`make setup` checks the prerequisites, creates a virtual environment in `.venv/` and installs the
pinned site dependencies from `requirements-docs.txt`. The `make` targets use `.venv/`
automatically, so there's no need to activate it.

Then run the same checks as CI: the Request Builder tests, the Python script tests, a check that
`reference/` matches `specs/`, a strict site build and validation of the built site.

```bash
make docs-ci
```

### Preview the site

```bash
make docs-serve
```

Open <http://127.0.0.1:8000/>. The site reloads when `reference/` or `docs-site/` changes. To build
the site into `site/` without serving it, run `make docs-build`.

### Regenerate the reference

`reference/` is generated from `specs/`. Don't edit it by hand: change the specifications or the
generator, then regenerate.

| Command | What it does |
|---|---|
| `make reference` | Rebuilds `reference/` from the specifications in `specs/`, without network access. Use it after changing the generator or a specification. |
| `make specs-update` | Downloads Adobe's latest specifications from [AdobeDocs/marketo-apis](https://github.com/AdobeDocs/marketo-apis) into `specs/`, then rebuilds `reference/`. If any download fails, no specification is changed. |

After regenerating:

1. Review the changes with `make specs-summary`. It lists changed counts, added, removed and
   changed operations, and new dates in descriptions, which are often deprecation deadlines.
2. Run `make docs-ci`. The Request Builder tests use real operation files, so update them if Adobe
   renames or removes an operation they use.
3. If the counts changed, update [What's included](#whats-included) and
   [API coverage](#api-coverage) to match `reference/README.md`.
4. Commit `specs/` and `reference/` together. CI fails if they don't match.

Run `make help` to list every task.

### Keeping up with Adobe

A scheduled workflow checks Adobe's specifications every week. When they change, it opens a draft
pull request with the regenerated reference and a summary of the changes, for review before merging.

## Repository structure

```text
.
├── .github/workflows/   # Site build and deployment, and the weekly specification check
├── docs-site/
│   ├── docs/            # Site pages and assets, including the Request Builder
│   ├── hooks/           # MkDocs hook that publishes reference/ and generates navigation
│   ├── overrides/       # Theme template overrides
│   ├── scripts/         # Validation of the built site
│   └── tests/           # Request Builder tests
├── reference/           # Generated reference: Markdown, operation JSON and manifest.json
├── scripts/             # Reference generator, specification change summary and their tests
├── specs/               # Adobe's specifications
├── LICENSE
├── Makefile
├── NOTICE
├── mkdocs.yml
└── requirements-docs.txt
```

## Sources and licence

The reference is generated from Adobe's Marketo Engage API specifications, published in
[AdobeDocs/marketo-apis](https://github.com/AdobeDocs/marketo-apis). The files in `specs/` are
unmodified copies, © Adobe and licensed under the Apache License 2.0, and `reference/` is generated
from them. See [NOTICE](NOTICE) for attribution.

This project is © 2026 Harrison Jennings and licensed under the
[Apache License, Version 2.0](LICENSE).

Use of the Marketo APIs themselves is subject to Adobe's
[API License Agreement](https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/api-license).
