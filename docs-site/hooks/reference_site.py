"""
MkDocs hook that publishes the generated Marketo API reference as a website.

The generated tree under reference/ stays the single source of truth. This
hook does not copy or rewrite files on disk; it:

- mounts reference/ (Markdown, *.operation.json, manifest.json) into the
  build as virtual files;
- generates navigation, summary content and a small site index for the
  Request Builder from reference/manifest.json and the model indexes;
- applies presentation-only Markdown transforms in memory (method badges,
  endpoint summary, Request Builder mount point);
- adds a hash-based Content-Security-Policy to every rendered page, including 404.html;
- removes the sitemap, because the site is not meant to be indexed.
"""

from __future__ import annotations

import base64
import hashlib
import html
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from mkdocs.exceptions import PluginError
from mkdocs.structure.files import File, Files, InclusionLevel

REPO_ROOT = Path(__file__).resolve().parents[2]
REFERENCE_DIR = REPO_ROOT / "reference"
MANIFEST_PATH = REFERENCE_DIR / "manifest.json"
SITE_INDEX_URI = "assets/data/site-index.json"
MODELS_OVERVIEW_URI = "models/index.md"

# The generator also writes validation-report.md. It is a local build log (the
# generator prints its summary), git-ignored and never published, so links to it
# render as plain text whether or not a local copy exists.
UNPUBLISHED_REFERENCE_FILES = ("validation-report.md",)

# Reuse the generator's slug rules so links match generated filenames.
sys.path.insert(0, str(REPO_ROOT / "scripts"))
from build_marketo_api_reference import slugify  # noqa: E402

SECTIONS: dict[str, dict[str, str]] = {
    "asset": {
        "title": "Asset API",
        "summary": "Emails, templates, forms, landing pages, programs, smart campaigns, smart lists, files, folders, snippets and tokens.",
    },
    "core": {
        "title": "Core API",
        "summary": "Leads, activities, campaigns, companies, custom objects, opportunities, lists, bulk jobs and usage.",
    },
    "data-ingestion": {
        "title": "Data Ingestion API",
        "summary": "High-volume, asynchronous ingestion of persons, companies, custom objects and memberships.",
    },
    "identity": {
        "title": "Identity API",
        "summary": "OAuth client-credentials token issuance.",
    },
    "user-management": {
        "title": "User Management API",
        "summary": "Users, invitations, roles and workspaces.",
    },
}

# Some upstream descriptions link to pages on Adobe's legacy developer site with
# root-relative URLs, which would resolve against this site instead.
UPSTREAM_DOCS_ORIGIN = "https://developers.marketo.com"
ROOT_RELATIVE_HREF = re.compile(r'href="/(?!/)')

HTTP_METHODS = ("GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS")
MODEL_ROW = re.compile(r"^\|\s*\[([^\]]+)\]\(([^)]+\.md)\)\s*\|", re.MULTILINE)
PERMISSIONS = re.compile(r"Required Permissions?:\s*([^\n]+?)\.?\s*$", re.IGNORECASE)
TABLE_METHOD = re.compile(r"^\| `(" + "|".join(HTTP_METHODS) + r")` \|", re.MULTILINE)
INLINE_SCRIPT = re.compile(r"<script(?![^>]*\bsrc=)(?![^>]*type=\"application/json\")[^>]*>(.*?)</script>", re.DOTALL)


@dataclass
class Operation:
    id: str
    section: str
    tag: str
    group: str
    method: str
    path: str
    title: str
    operation_id: str
    markdown: str
    json: str
    description: str = ""


@dataclass
class State:
    manifest: dict[str, Any] = field(default_factory=dict)
    operations: list[Operation] = field(default_factory=list)
    by_markdown: dict[str, Operation] = field(default_factory=dict)
    models: dict[str, list[tuple[str, str]]] = field(default_factory=dict)  # section -> [(name, file)]


STATE = State()


def section_title(section: str) -> str:
    return SECTIONS.get(section, {}).get("title") or f"{section.replace('-', ' ').title()} API"


# --------------------------------------------------------------------------
# Loading and validating generated metadata
# --------------------------------------------------------------------------


def load_state() -> State:
    if not MANIFEST_PATH.is_file():
        raise PluginError(f"Missing {MANIFEST_PATH.relative_to(REPO_ROOT)}. Run the reference generator first.")
    try:
        manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        raise PluginError(f"reference/manifest.json is not valid JSON: {error}") from error

    state = State(manifest=manifest)
    problems: list[str] = []
    required_keys = ("section", "tag", "method", "path", "title", "operationId", "markdown", "json")
    for index, entry in enumerate(manifest.get("operations") or []):
        missing = [key for key in required_keys if not entry.get(key)]
        if missing:
            problems.append(f"operations[{index}] is missing {', '.join(missing)}")
            continue
        for key in ("markdown", "json"):
            if not (REFERENCE_DIR / entry[key]).is_file():
                problems.append(f"operations[{index}].{key} does not exist: reference/{entry[key]}")
        if not entry["json"].endswith(".operation.json"):
            problems.append(f"operations[{index}].json is not an operation file: {entry['json']}")
            continue
        parts = entry["markdown"].split("/")
        if len(parts) != 3:
            problems.append(f"operations[{index}].markdown is not section/group/file.md: {entry['markdown']}")
            continue
        description = ""
        if (REFERENCE_DIR / entry["json"]).is_file():
            description = operation_description(REFERENCE_DIR / entry["json"])
        operation = Operation(
            id=entry["json"][: -len(".operation.json")],
            section=entry["section"],
            tag=entry["tag"],
            group=parts[1],
            method=entry["method"].upper(),
            path=entry["path"],
            title=entry["title"],
            operation_id=entry["operationId"],
            markdown=entry["markdown"],
            json=entry["json"],
            description=description,
        )
        state.operations.append(operation)
        state.by_markdown[f"reference/{entry['markdown']}"] = operation

    expected = (manifest.get("summary") or {}).get("operations")
    if expected is not None and expected != len(state.operations):
        problems.append(f"manifest summary lists {expected} operations but {len(state.operations)} entries are valid")

    for section in sorted({operation.section for operation in state.operations}):
        readme = REFERENCE_DIR / section / "models" / "README.md"
        if not readme.is_file():
            state.models[section] = []
            continue
        rows = MODEL_ROW.findall(readme.read_text(encoding="utf-8"))
        for name, filename in rows:
            if filename != f"{slugify(name)}.md" or not (readme.parent / filename).is_file():
                problems.append(f"model {name} in reference/{section}/models/README.md links to missing {filename}")
        state.models[section] = rows

    if problems:
        raise PluginError("Generated reference metadata is inconsistent:\n- " + "\n- ".join(problems))
    return state


def operation_description(path: Path) -> str:
    document = json.loads(path.read_text(encoding="utf-8"))
    for path_item in document.get("paths", {}).values():
        for operation in path_item.values():
            if isinstance(operation, dict) and "responses" in operation:
                return str(operation.get("description") or operation.get("summary") or "")
    return ""


# --------------------------------------------------------------------------
# Navigation
# --------------------------------------------------------------------------


def build_nav(state: State, static_nav: list[Any]) -> list[Any]:
    reference: list[Any] = ["reference/README.md"]
    models: list[Any] = [MODELS_OVERVIEW_URI]

    sections: dict[str, list[Operation]] = {}
    for operation in state.operations:
        sections.setdefault(operation.section, []).append(operation)

    for section in sorted(sections, key=lambda item: section_title(item)):
        groups: dict[str, list[Operation]] = {}
        for operation in sections[section]:
            groups.setdefault(operation.group, []).append(operation)
        section_nav: list[Any] = [f"reference/{section}/README.md"]
        for group in sorted(groups, key=lambda item: groups[item][0].tag.casefold()):
            entries: list[Any] = [f"reference/{section}/{group}/README.md"]
            entries.extend({operation.title: f"reference/{operation.markdown}"} for operation in groups[group])
            section_nav.append({groups[group][0].tag: entries})
        reference.append({section_title(section): section_nav})

        # Individual models are linked from each model index rather than listed
        # in the sidebar: hundreds of entries would bloat every rendered page.
        models.append({section_title(section): f"reference/{section}/models/README.md"})

    nav: list[Any] = []
    for item in static_nav:
        if isinstance(item, dict) and item.get("API Reference") == "GENERATED":
            nav.append({"API Reference": reference})
        elif isinstance(item, dict) and item.get("Models") == "GENERATED":
            nav.append({"Models": models})
        else:
            nav.append(item)
    return nav


def on_config(config, **kwargs):
    global STATE
    STATE = load_state()
    config.nav = build_nav(STATE, config.nav or [])
    return config


# --------------------------------------------------------------------------
# Files
# --------------------------------------------------------------------------


def site_index(state: State, files: Files) -> dict[str, Any]:
    def url_of(src_uri: str) -> str:
        file = files.get_file_from_path(src_uri)
        if file is None:
            raise PluginError(f"Expected site file is missing: {src_uri}")
        return file.url

    operations_per_section: dict[str, int] = {}
    for operation in state.operations:
        operations_per_section[operation.section] = operations_per_section.get(operation.section, 0) + 1

    return {
        "summary": state.manifest.get("summary", {}),
        "sections": [
            {
                "id": section,
                "title": section_title(section),
                "page": url_of(f"reference/{section}/README.md"),
                "operations": operations_per_section[section],
                "models": len(state.models.get(section, [])),
            }
            for section in sorted(operations_per_section, key=section_title)
        ],
        "operations": [
            {
                "id": operation.id,
                "section": operation.section,
                "tag": operation.tag,
                "method": operation.method,
                "path": operation.path,
                "title": operation.title,
                "operationId": operation.operation_id,
                "page": url_of(f"reference/{operation.markdown}"),
                "json": url_of(f"reference/{operation.json}"),
            }
            for operation in state.operations
        ],
        "models": {
            section: {name: url_of(f"reference/{section}/models/{filename}") for name, filename in rows}
            for section, rows in state.models.items()
        },
    }


def models_overview(state: State) -> str:
    lines = [
        "---",
        "description: Request and response schemas used by the Marketo Engage APIs, grouped by API.",
        "---",
        "",
        "# Models",
        "",
        "Models are the shared request and response schemas referenced by operations. Each API",
        "specification defines its own models, so a name such as `Error` can appear in more than one API.",
        "",
        "| API | Models |",
        "|---|---:|",
    ]
    for section in sorted(state.models, key=section_title):
        lines.append(f"| [{section_title(section)}](../reference/{section}/models/README.md) | {len(state.models[section])} |")
    lines += [
        "",
        "Operation pages link to the models they use, and the Request Builder links schema names to these pages.",
        "",
    ]
    return "\n".join(lines)


def on_files(files: Files, config, **kwargs):
    for path in sorted(REFERENCE_DIR.rglob("*")):
        if not path.is_file() or path.name in UNPUBLISHED_REFERENCE_FILES:
            continue
        if path.suffix == ".md" or path.name.endswith(".operation.json") or path == MANIFEST_PATH:
            src_uri = path.relative_to(REPO_ROOT).as_posix()
            is_model = path.parent.name == "models" and path.name != "README.md"
            inclusion = InclusionLevel.NOT_IN_NAV if is_model else InclusionLevel.UNDEFINED
            files.append(File.generated(config, src_uri, abs_src_path=str(path), inclusion=inclusion))

    files.append(File.generated(config, MODELS_OVERVIEW_URI, content=models_overview(STATE)))
    index = json.dumps(site_index(STATE, files), indent=None, separators=(",", ":"), ensure_ascii=False)
    files.append(File.generated(config, SITE_INDEX_URI, content=index))
    return files


# --------------------------------------------------------------------------
# Markdown transforms (in memory only)
# --------------------------------------------------------------------------


def method_badge(method: str) -> str:
    return f'<span class="http-method http-method--{method.lower()}">{method}</span>'


def first_sentence(text: str, limit: int = 180) -> str:
    plain = re.sub(r"<[^>]+>", " ", text)
    plain = re.sub(r"\s+", " ", plain).strip()
    match = re.match(r"(.+?[.!?])(\s|$)", plain)
    sentence = match.group(1) if match else plain
    return sentence if len(sentence) <= limit else sentence[: limit - 1].rstrip() + "…"


def insert_after_h1(markdown: str, block: str) -> str:
    match = re.search(r"^# .+$", markdown, re.MULTILINE)
    if not match:
        return f"{block}\n\n{markdown}"
    return f"{markdown[: match.end()]}\n\n{block}\n{markdown[match.end():]}"


def operation_summary(operation: Operation) -> str:
    parts = [
        '<div class="op-summary">',
        f'<p class="op-summary__endpoint">{method_badge(operation.method)} '
        f'<code class="op-summary__path">{html.escape(operation.path)}</code></p>',
    ]
    permissions = PERMISSIONS.search(operation.description)
    if permissions:
        chips = "".join(
            f'<span class="op-permission">{html.escape(item.strip())}</span>'
            for item in permissions.group(1).split(",")
            if item.strip()
        )
        parts.append(f'<p class="op-summary__permissions"><span class="op-summary__label">Permissions</span> {chips}</p>')
    parts.append(
        '<p class="op-summary__actions"><a class="op-summary__jump" href="#request-builder">'
        "Build a request and mock the response</a></p>"
    )
    parts.append("</div>")
    return "\n".join(parts)


def plural(count: int, noun: str) -> str:
    return f"{count} {noun}{'' if count == 1 else 's'}"


def home_sections(state: State) -> str:
    counts: dict[str, int] = {}
    for operation in state.operations:
        counts[operation.section] = counts.get(operation.section, 0) + 1
    cards = []
    for section in sorted(counts, key=section_title):
        groups = len({operation.group for operation in state.operations if operation.section == section})
        cards.append(
            f"-   **[{section_title(section)}](reference/{section}/README.md)**\n\n"
            "    ---\n\n"
            f"    {SECTIONS.get(section, {}).get('summary', '')}\n\n"
            f"    {plural(counts[section], 'operation')} · {plural(groups, 'group')} · "
            f"{plural(len(state.models.get(section, [])), 'model')}"
        )
    return '<div class="grid cards" markdown>\n\n' + "\n\n".join(cards) + "\n\n</div>"


def home_stats(state: State) -> str:
    summary = state.manifest.get("summary", {})
    return (
        f"**{summary.get('operations', len(state.operations))} operations** · "
        f"**{summary.get('models', sum(len(rows) for rows in state.models.values()))} models** · "
        f"**{summary.get('specifications', len(state.models))} API specifications**"
    )


def strip_unpublished_links(markdown: str) -> str:
    for name in UNPUBLISHED_REFERENCE_FILES:
        markdown = re.sub(r"\[`?" + re.escape(name) + r"`?\]\(" + re.escape(name) + r"\)", f"`{name}`", markdown)
    return markdown


def on_page_markdown(markdown: str, page, config, files, **kwargs):
    src_uri = page.file.src_uri

    if src_uri == "index.md":
        return markdown.replace("<!-- generated:stats -->", home_stats(STATE)).replace(
            "<!-- generated:api-sections -->", home_sections(STATE)
        )

    if not src_uri.startswith("reference/"):
        return markdown

    markdown = strip_unpublished_links(markdown)
    markdown = ROOT_RELATIVE_HREF.sub(f'href="{UPSTREAM_DOCS_ORIGIN}/', markdown)
    markdown = TABLE_METHOD.sub(lambda match: f"| {method_badge(match.group(1))} |", markdown)
    parts = src_uri.split("/")

    operation = STATE.by_markdown.get(src_uri)
    if operation:
        page.meta.setdefault("template", "operation.html")
        page.meta.setdefault("title", f"{operation.title} · {operation.tag} · {section_title(operation.section)}")
        page.meta.setdefault("description", first_sentence(operation.description) or operation.title)
        page.meta["operation_id"] = operation.id
        page.meta.setdefault("hide", ["toc"])
        return insert_after_h1(markdown, operation_summary(operation))

    if len(parts) == 3 and parts[2] == "README.md":
        section = parts[1]
        title = section_title(section)
        page.meta.setdefault("title", title)
        page.meta.setdefault("description", SECTIONS.get(section, {}).get("summary") or f"{title} reference.")
        match = re.search(r"^# (.+)$", markdown, re.MULTILINE)
        if match:
            original = match.group(1).strip()
            note = f"*Specification title: {original}*" if original != title else ""
            markdown = f"{markdown[: match.start()]}# {title}\n\n{note}{markdown[match.end():]}"
        return markdown

    # Group indexes, model indexes and model pages: qualify the heading with the
    # API, because names such as "Models" or "Error" repeat across APIs.
    heading = re.search(r"^# (.+)$", markdown, re.MULTILINE)
    if heading and len(parts) == 4:
        name = heading.group(1).strip()
        is_model = parts[2] == "models" and parts[3] != "README.md"
        page.meta.setdefault("title", f"{name} · {section_title(parts[1])}{' model' if is_model else ''}")
        if is_model:
            page.meta.setdefault("description", f"The {name} schema in the Marketo {section_title(parts[1])}.")
    return markdown


# --------------------------------------------------------------------------
# Content Security Policy
# --------------------------------------------------------------------------


def content_security_policy(output: str) -> str:
    hashes = sorted(
        {
            "'sha256-" + base64.b64encode(hashlib.sha256(match.group(1).encode("utf-8")).digest()).decode("ascii") + "'"
            for match in INLINE_SCRIPT.finditer(output)
        }
    )
    directives = [
        "default-src 'self'",
        "script-src 'self' " + " ".join(hashes) if hashes else "script-src 'self'",
        # Material sets inline style attributes for layout.
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data:",
        "font-src 'self'",
        # Only same-origin static files may be fetched: the Request Builder
        # cannot contact Marketo or any other host.
        "connect-src 'self'",
        "worker-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
    ]
    return "; ".join(directives)


def on_post_build(config, **kwargs):
    # The theme always renders a sitemap; a noindexed site shouldn't advertise
    # its URLs to crawlers.
    site_dir = Path(config.site_dir)
    for name in ("sitemap.xml", "sitemap.xml.gz"):
        (site_dir / name).unlink(missing_ok=True)


def add_content_security_policy(output: str) -> str:
    meta = f'<meta http-equiv="Content-Security-Policy" content="{content_security_policy(output)}">'
    return output.replace("<head>", f"<head>\n    {meta}", 1)


def on_post_page(output: str, page, config, **kwargs):
    return add_content_security_policy(output)


def on_post_template(output_content: str, template_name: str, config, **kwargs):
    # Static templates such as 404.html are not pages, so on_post_page skips them.
    if template_name.endswith(".html"):
        return add_content_security_policy(output_content)
    return output_content
