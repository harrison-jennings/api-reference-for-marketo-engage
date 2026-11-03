# Development

## Prerequisites

| Tool | Version | Used for | Install |
|---|---|---|---|
| Git | Any | Cloning the repository | macOS: `xcode-select --install`; Debian/Ubuntu: `sudo apt install git` |
| Python | 3.10 or later | The generators, which need no packages | [python.org](https://www.python.org/downloads/) or `brew install python`; Debian/Ubuntu: `sudo apt install python3` |
| Node.js | 22.23 or later (`.nvmrc` says 24) | The site, the Request Builder tests and the Postman generator | [nodejs.org](https://nodejs.org/) or `nvm use` |
| Make | Any | Running the tasks | macOS: `xcode-select --install`; Debian/Ubuntu: `sudo apt install make` |

On Windows, use [WSL](https://learn.microsoft.com/windows/wsl/install) and follow the Debian/Ubuntu instructions.

## Set up

```sh
make setup       # check the prerequisites and install the site's dependencies
make web-dev     # http://127.0.0.1:4321/, reloading as you change web/
make docs-ci     # the same checks as CI, apart from the browser tests
```

The browser tests need Playwright's browsers once:

```sh
cd web && npx playwright install chromium firefox webkit && cd ..
make docs-build docs-e2e
```

## Regenerate the reference

`reference/` is generated from `specs/`, and `postman/` from `reference/`. Don't edit either by hand: change
the specifications or the generator, then regenerate.

| Command | What it does |
|---|---|
| `make reference` | Rebuilds `reference/` from `specs/`, without network access. Use it after changing the generator or a specification. |
| `make specs-update` | Downloads Adobe's latest specifications from [AdobeDocs/marketo-apis](https://github.com/AdobeDocs/marketo-apis) into `specs/`, then rebuilds `reference/`. If any download fails, no specification is changed. |
| `make postman` | Rebuilds the Postman collection and environment template from `reference/`, without network access. |

After regenerating:

1. Review the changes with `make specs-summary`. It lists changed counts, added, removed and changed
   operations, and new dates in descriptions, which are often deprecation deadlines. `make postman-summary`
   does the same for the Postman collection.
2. Run `make docs-ci`. The Request Builder tests use real operation files, so update them if Adobe renames or
   removes an operation they use.
3. If the counts changed, update the README's opening section and API coverage table to match
   `reference/README.md`.
4. Commit `specs/`, `reference/` and `postman/` together. CI fails if they don't match.

## Keeping up with Adobe

A scheduled workflow checks Adobe's specifications every week. When they change, it opens a draft pull request
with the regenerated reference and Postman collection and a summary, for review before merging.
[architecture.md](architecture.md) explains how it's kept safe.

## Changing the site

- **Run the full checks before pushing builder changes.** The Postman collection is generated with the
  builder's parser, so `make postman-check` can fail on a builder change. Run `make postman` if the change
  is intended.
- **Generated Markdown must stay readable on GitHub.** The site reads `reference/` and never writes to it.
- **Keep the promise.** The builder sends nothing and asks for no credentials, and the tests check that.
- **Keep the disclaimer** on every page, word for word. The site check enforces it.

The README's images are drawn by a script: see [design.md](design.md).
