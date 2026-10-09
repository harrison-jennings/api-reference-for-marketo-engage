# Documentation site tasks. CI runs these same targets.

PYTHON ?= $(if $(wildcard .venv/bin/python),.venv/bin/python,python3)
NODE ?= node
SITE_DIR ?= site

.PHONY: help check-prereqs setup docs-install reference specs-update specs-summary postman postman-check postman-test postman-summary docs-serve docs-test scripts-test reference-check docs-build docs-ci clean

help:
	@echo "Setup"
	@echo "  check-prereqs    Check Python 3.10+ (with venv) and Node.js 20+ are installed"
	@echo "  setup            check-prereqs, then create .venv and install documentation dependencies"
	@echo "  docs-install     Create .venv and install documentation dependencies"
	@echo "Generate the API reference"
	@echo "  reference        Rebuild reference/ from the committed specifications in specs/"
	@echo "  specs-update     Download Adobe's latest specifications into specs/ and rebuild reference/"
	@echo "  specs-summary    Summarise how reference/ differs from the last commit (BASE=<ref> to compare elsewhere)"
	@echo "Postman collection"
	@echo "  postman          Regenerate the Postman collection and environment template in postman/ from reference/"
	@echo "  postman-check    Verify postman/ matches the generator output for reference/"
	@echo "  postman-test     Test the Postman files: schema, coverage, inputs, auth, scripts, privacy"
	@echo "  postman-summary  Summarise how postman/ differs from the last commit (BASE=<ref> to compare elsewhere)"
	@echo "Site"
	@echo "  docs-serve       Preview the site at http://127.0.0.1:8000/ with live reload"
	@echo "  docs-test        Run Request Builder unit tests (Node.js 20+, no npm install needed)"
	@echo "  scripts-test     Run Python unit tests for the repository scripts"
	@echo "  reference-check  Verify reference/ matches the generator output for specs/"
	@echo "  docs-build       Build the site with strict checks and validate the output"
	@echo "  docs-ci          Everything CI runs: tests, reference and Postman checks, build and validation"
	@echo "  clean            Remove the built site"

check-prereqs:
	@command -v python3 > /dev/null || { echo "python3 not found: install Python 3.10 or later." >&2; exit 1; }
	@python3 -c 'import sys; sys.exit(sys.version_info < (3, 10))' \
		|| { echo "Python 3.10 or later is required; found $$(python3 --version)." >&2; exit 1; }
	@python3 -c 'import venv, ensurepip' 2> /dev/null \
		|| { echo "Python venv support is missing (Debian/Ubuntu: sudo apt install python3-venv)." >&2; exit 1; }
	@command -v $(NODE) > /dev/null || { echo "Node.js not found: install Node.js 20 or later." >&2; exit 1; }
	@$(NODE) -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 20 ? 0 : 1)' \
		|| { echo "Node.js 20 or later is required; found $$($(NODE) --version)." >&2; exit 1; }
	@echo "Prerequisites OK: $$(python3 --version), Node.js $$($(NODE) --version)."

setup: check-prereqs docs-install

docs-install:
	python3 -m venv .venv
	.venv/bin/python -m pip install --upgrade pip
	.venv/bin/python -m pip install -r requirements-docs.txt

# The generator needs only the Python standard library. --clean rebuilds the
# whole of reference/; --json-fragments writes the *.operation.json files the
# Request Builder reads, so it must always be included.
GENERATE := $(PYTHON) scripts/build_marketo_api_reference.py --output reference --clean --json-fragments

reference:
	$(GENERATE) specs

specs-update:
	$(GENERATE) --download-adobe --overwrite-specs --specs-dir specs

BASE ?= HEAD

specs-summary:
	@$(PYTHON) scripts/summarise_spec_changes.py --base $(BASE)

# The Postman collection and environment template are generated from reference/
# by a Node.js script with no dependencies, and committed for review.
POSTMAN_FILES := marketo-engage.postman_collection.json marketo-engage.postman_environment.json

postman:
	$(NODE) scripts/build_postman_collection.mjs --output postman

postman-check:
	@tmp="$$(mktemp -d)"; \
	$(NODE) scripts/build_postman_collection.mjs --output "$$tmp" > /dev/null; \
	status=$$?; \
	for file in $(POSTMAN_FILES); do \
		[ $$status -ne 0 ] || cmp "postman/$$file" "$$tmp/$$file" || status=1; \
	done; \
	rm -rf "$$tmp"; \
	if [ $$status -ne 0 ]; then echo "postman/ is out of date: run make postman." >&2; exit $$status; fi; \
	echo "postman/ is up to date with reference/."

postman-test:
	$(NODE) --test "scripts/tests/postman-*.test.mjs"

postman-summary:
	@$(NODE) scripts/summarise_postman_changes.mjs --base $(BASE)

docs-serve:
	$(PYTHON) -m mkdocs serve

scripts-test:
	$(PYTHON) -m unittest discover --start-directory scripts/tests

docs-test:
	cd docs-site && $(NODE) --test "tests/**/*.test.js"

# validation-report.md is written by the generator but not committed.
reference-check:
	@tmp="$$(mktemp -d)"; \
	$(PYTHON) scripts/build_marketo_api_reference.py specs --output "$$tmp" --clean --json-fragments > /dev/null \
		&& diff -r --exclude=validation-report.md reference "$$tmp"; \
	status=$$?; rm -rf "$$tmp"; \
	if [ $$status -ne 0 ]; then echo "reference/ is out of date: regenerate it from specs/." >&2; exit $$status; fi; \
	echo "reference/ is up to date with specs/."

docs-build:
	$(PYTHON) -m mkdocs build --strict --site-dir "$(SITE_DIR)"
	$(PYTHON) docs-site/scripts/check_site.py "$(SITE_DIR)"

docs-ci: docs-test scripts-test reference-check postman-test postman-check docs-build

clean:
	rm -rf "$(SITE_DIR)"
