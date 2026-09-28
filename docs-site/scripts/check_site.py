#!/usr/bin/env python3
"""
Validate a built documentation site before it is published.

Checks:
- every manifest operation has a rendered page with a Request Builder mount
  and a parseable operation JSON file;
- every section, group and model page exists;
- every internal link, script, stylesheet and image resolves to a built file,
  and none is root-absolute (which would break under /<repository>/ on Pages);
- no private files or secret-looking values are published;
- the header links to the source repository without Material's
  data-md-component="source", which fetches from api.github.com;
- every page asks search engines not to index it, and there is no sitemap;
- every page has a Content Security Policy that blocks connections to other hosts;
- every page carries Adobe's required disclaimer.

Usage: python docs-site/scripts/check_site.py [site_dir]
"""

from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

REPO_ROOT = Path(__file__).resolve().parents[2]
REFERENCE_DIR = REPO_ROOT / "reference"

FORBIDDEN_FILES = [
    re.compile(r"(^|/)\.env(\..+)?$"),
    re.compile(r"\.postman_environment\.json$"),
    re.compile(r"(^|/)\.git(/|$)"),
    re.compile(r"\.(pem|key|p12|pfx)$"),
]

# Patterns that indicate a real credential or machine-specific path.
SECRET_PATTERNS = {
    "private key": re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
    "GitHub token": re.compile(r"\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}\b|\bgithub_pat_[A-Za-z0-9_]{40,}\b"),
    "AWS access key": re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    "bearer token": re.compile(r"Bearer\s+(?!<ACCESS_TOKEN>|\{\{)[A-Za-z0-9\-_.~+/]{20,}=*"),
    "credential value": re.compile(
        r"(client_secret|client_id|access_token)(=|\"\s*:\s*\")(?!<|\{\{|\$\{|example)[A-Za-z0-9\-_.]{16,}",
        re.IGNORECASE,
    ),
    "local path": re.compile(r"(/Users/[A-Za-z0-9._-]+/|/home/runner/|C:\\\\Users\\\\)"),
    "Marketo instance": re.compile(r"\b(?!123-ABC-456\.)\d{3}-[A-Za-z]{3}-\d{3}\.mktorest\.com\b", re.IGNORECASE),
}
TEXT_SUFFIXES = {".html", ".js", ".json", ".css", ".xml", ".txt", ".map"}
NOINDEX = re.compile(r'<meta name="robots" content="noindex, nofollow">')
CSP = re.compile(r'<meta http-equiv="Content-Security-Policy" content="[^"]*\bconnect-src \'self\'[^"]*">')
SOURCE_REPOSITORY_LINK = 'href="https://github.com/harrison-jennings/api-reference-for-marketo-engage"'
# Material's source component fetches star and fork counts, which the CSP blocks.
SOURCE_COMPONENT = 'data-md-component="source"'
# Wording required by Adobe's trademark guidelines (rule 7); mkdocs.yml puts it in every footer.
DISCLAIMER = re.compile(r"NOT AUTHORIZED, ENDORSED OR SPONSORED BY ADOBE, PUBLISHER OF\s+ADOBE MARKETO ENGAGE")


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[tuple[str, str]] = []
        self.builders: list[str] = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if "data-request-builder" in values:
            self.builders.append(values["data-request-builder"] or "")
        for attribute in ("href", "src"):
            if values.get(attribute) and not (tag == "link" and values.get("rel") in {"canonical", "alternate"}):
                self.links.append((tag, values[attribute]))


def resolve(page: Path, url: str) -> Path | None:
    parts = urlsplit(url)
    if parts.scheme or parts.netloc or url.startswith(("mailto:", "#", "data:", "javascript:")):
        return None
    target = (page.parent / unquote(parts.path)).resolve() if parts.path else page
    if target.is_dir() or parts.path.endswith("/"):
        target = target / "index.html"
    return target


def main() -> int:
    site = Path(sys.argv[1] if len(sys.argv) > 1 else REPO_ROOT / "site").resolve()
    errors: list[str] = []

    def error(message: str) -> None:
        errors.append(message)

    if not (site / "index.html").is_file():
        print(f"No built site at {site}", file=sys.stderr)
        return 1

    # Expected pages ---------------------------------------------------------
    manifest = json.loads((REFERENCE_DIR / "manifest.json").read_text(encoding="utf-8"))
    for unwanted in ("sitemap.xml", "sitemap.xml.gz"):
        if (site / unwanted).exists():
            error(f"{unwanted} is published, but the site must not be indexed")
    for required in ("index.html", "404.html", "notices/index.html", "search/search_index.json", "assets/data/site-index.json",
                     "reference/index.html", "models/index.html", "playground/index.html", "search/index.html",
                     "about/index.html"):
        if not (site / required).is_file():
            error(f"missing {required}")

    for entry in manifest["operations"]:
        page = site / "reference" / entry["markdown"][: -len(".md")] / "index.html"
        operation_id = entry["json"][: -len(".operation.json")]
        if not page.is_file():
            error(f"missing operation page for {entry['markdown']}")
            continue
        parser = LinkParser()
        parser.feed(page.read_text(encoding="utf-8"))
        if parser.builders != [operation_id]:
            error(f"{page.relative_to(site)} has Request Builder mounts {parser.builders}, expected [{operation_id}]")
        try:
            json.loads((site / "reference" / entry["json"]).read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as problem:
            error(f"operation JSON for {entry['json']} is missing or invalid: {problem}")

    for markdown in REFERENCE_DIR.rglob("*.md"):
        if markdown.name == "validation-report.md":
            continue  # local generator log, never published
        relative = markdown.relative_to(REFERENCE_DIR)
        stem = relative.parent if markdown.name == "README.md" else relative.with_suffix("")
        if not (site / "reference" / stem / "index.html").is_file():
            error(f"missing page for reference/{relative}")

    index = json.loads((site / "assets/data/site-index.json").read_text(encoding="utf-8"))
    if len(index["operations"]) != manifest["summary"]["operations"]:
        error("site index operation count does not match the manifest")
    for section, models in index["models"].items():
        for name, url in models.items():
            if not (site / url / "index.html").is_file():
                error(f"site index model {section}/{name} points to missing {url}")

    # Links and assets ----------------------------------------------------------
    pages = sorted(site.rglob("*.html"))
    for page in pages:
        html_text = page.read_text(encoding="utf-8")
        if not NOINDEX.search(html_text):
            error(f"{page.relative_to(site)}: missing robots noindex meta tag")
        if not CSP.search(html_text):
            error(f"{page.relative_to(site)}: missing Content Security Policy with connect-src 'self'")
        if SOURCE_COMPONENT in html_text:
            error(f"{page.relative_to(site)}: repository link fetches from api.github.com ({SOURCE_COMPONENT})")
        if not DISCLAIMER.search(html_text):
            error(f"{page.relative_to(site)}: missing Adobe's disclaimer")
        if SOURCE_REPOSITORY_LINK not in html_text:
            error(f"{page.relative_to(site)}: missing the header link to the source repository")
        if page.name == "404.html":
            continue  # 404 uses site_url-absolute links by design
        parser = LinkParser()
        parser.feed(html_text)
        for tag, url in parser.links:
            if url.startswith("/") and not url.startswith("//"):
                error(f"{page.relative_to(site)}: root-absolute {tag} URL {url} breaks under a repository base path")
                continue
            target = resolve(page, url)
            if target is not None and not target.is_file():
                error(f"{page.relative_to(site)}: broken {tag} link {url}")

    # Private content -------------------------------------------------------------
    for path in site.rglob("*"):
        if not path.is_file():
            continue
        relative = path.relative_to(site).as_posix()
        if any(pattern.search(relative) for pattern in FORBIDDEN_FILES):
            error(f"forbidden file published: {relative}")
        if path.suffix not in TEXT_SUFFIXES:
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        for label, pattern in SECRET_PATTERNS.items():
            match = pattern.search(text)
            if match:
                # Report where, never the value: CI logs are public.
                line = text.count("\n", 0, match.start()) + 1
                error(f"{relative}:{line}: possible {label} (value not shown)")

    if errors:
        print(f"Site validation failed with {len(errors)} problem(s):", file=sys.stderr)
        for message in errors[:200]:
            print(f"- {message}", file=sys.stderr)
        return 1
    print(f"Site validation passed: {len(pages)} HTML pages, {len(manifest['operations'])} operations checked.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
