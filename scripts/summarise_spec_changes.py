#!/usr/bin/env python3
"""
Summarise how the generated reference changed between a git commit and the
working tree, as Markdown suitable for a pull request description.

Reports operation and model counts per API, added and removed operations,
changed operations (parameters, descriptions, responses, models), and dates
that newly appear in descriptions, which Adobe uses for deprecation and
enforcement notices.

Usage:
    python3 scripts/summarise_spec_changes.py [--base REF]

REF defaults to HEAD, i.e. the committed reference before regenerating.
Requires only the Python standard library.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parents[1]
MANIFEST = "reference/manifest.json"
DATE = re.compile(r"\b20\d\d-\d\d-\d\d\b")
LIST_LIMIT = 60


def git(*args: str) -> str:
    return subprocess.run(["git", *args], cwd=REPO_ROOT, check=True, capture_output=True, text=True).stdout


def read_base(ref: str, path: str) -> Any | None:
    try:
        return json.loads(git("show", f"{ref}:{path}"))
    except subprocess.CalledProcessError:
        return None


def read_current(path: str) -> Any | None:
    file = REPO_ROOT / path
    return json.loads(file.read_text(encoding="utf-8")) if file.is_file() else None


def only_operation(document: dict[str, Any]) -> dict[str, Any]:
    for path_item in document.get("paths", {}).values():
        for operation in path_item.values():
            if isinstance(operation, dict) and "responses" in operation:
                return operation
    return {}


def schemas(document: dict[str, Any]) -> dict[str, Any]:
    """Named schemas: Swagger 2 definitions or OpenAPI 3 components.schemas."""
    if "definitions" in document:
        return document.get("definitions") or {}
    return (document.get("components") or {}).get("schemas") or {}


def plain(text: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", text or "")).strip()


def operation_changes(before: dict[str, Any], after: dict[str, Any]) -> tuple[list[str], set[str]]:
    """Describe what changed in one operation file, and dates new to its description."""
    old, new = only_operation(before), only_operation(after)
    changes: list[str] = []

    params_old = {(p.get("in"), p.get("name")): p for p in old.get("parameters", [])}
    params_new = {(p.get("in"), p.get("name")): p for p in new.get("parameters", [])}
    added = sorted(f"`{name}`" for (_, name) in params_new.keys() - params_old.keys())
    removed = sorted(f"`{name}`" for (_, name) in params_old.keys() - params_new.keys())
    modified = sorted(f"`{key[1]}`" for key in params_old.keys() & params_new.keys() if params_old[key] != params_new[key])
    if added:
        changes.append(f"new parameters {', '.join(added)}")
    if removed:
        changes.append(f"removed parameters {', '.join(removed)}")
    if modified:
        changes.append(f"changed parameters {', '.join(modified)}")
    if old.get("summary") != new.get("summary"):
        changes.append(f"renamed from “{old.get('summary')}”")
    if old.get("description") != new.get("description"):
        changes.append("description")
    if old.get("requestBody") != new.get("requestBody"):
        changes.append("request body")
    if old.get("responses") != new.get("responses"):
        changes.append("responses")
    if bool(old.get("deprecated")) != bool(new.get("deprecated")):
        changes.append("now deprecated" if new.get("deprecated") else "no longer deprecated")

    models_old, models_new = schemas(before), schemas(after)
    model_added = sorted(models_new.keys() - models_old.keys())
    model_removed = sorted(models_old.keys() - models_new.keys())
    model_changed = sorted(name for name in models_old.keys() & models_new.keys() if models_old[name] != models_new[name])
    if model_added:
        changes.append(f"new models {', '.join(f'`{m}`' for m in model_added)}")
    if model_removed:
        changes.append(f"removed models {', '.join(f'`{m}`' for m in model_removed)}")
    if model_changed:
        changes.append(f"changed models {', '.join(f'`{m}`' for m in model_changed)}")

    new_dates = set(DATE.findall(plain(new.get("description", "")))) - set(DATE.findall(plain(old.get("description", ""))))
    return changes, new_dates


def limited(lines: list[str]) -> list[str]:
    if len(lines) <= LIST_LIMIT:
        return lines
    return lines[:LIST_LIMIT] + [f"- …and {len(lines) - LIST_LIMIT} more"]


def summarise(base: str) -> str:
    before, after = read_base(base, MANIFEST), read_current(MANIFEST)
    if before is None or after is None:
        raise SystemExit(f"Could not read {MANIFEST} at {base} and in the working tree.")

    lines: list[str] = []

    # Counts per specification.
    specs_before = {spec["section"]: spec for spec in before.get("specifications", [])}
    specs_after = {spec["section"]: spec for spec in after.get("specifications", [])}
    lines += ["### Counts", "", "| API | Operations | Models | Specification version |", "|---|---:|---:|---|"]
    for section in sorted(specs_before.keys() | specs_after.keys()):
        old, new = specs_before.get(section, {}), specs_after.get(section, {})

        def cell(key: str) -> str:
            a, b = old.get(key, "—"), new.get(key, "—")
            return f"{a} → **{b}**" if a != b else str(b)

        lines.append(f"| {section} | {cell('operations')} | {cell('models')} | {cell('version')} |")
    total = lambda manifest, key: manifest.get("summary", {}).get(key, "—")  # noqa: E731
    for key in ("operations", "models"):
        if total(before, key) != total(after, key):
            lines.append(f"| **Total {key}** | {total(before, key)} → **{total(after, key)}** | | |")
    lines.append("")

    # Specification files.
    changed_specs = [line.strip() for line in git("diff", "--stat", base, "--", "specs").splitlines()[:-1]]
    lines += ["### Specification files changed", ""]
    lines += [f"- `{line}`" for line in changed_specs] or ["- None"]
    lines.append("")

    key = lambda operation: (operation["method"], operation["path"])  # noqa: E731
    ops_before = {key(op): op for op in before.get("operations", [])}
    ops_after = {key(op): op for op in after.get("operations", [])}

    # Added operations, grouped by API and endpoint group.
    added = sorted(ops_after.keys() - ops_before.keys())
    existing_groups = {(op["section"], op["tag"]) for op in before.get("operations", [])}
    groups: dict[tuple[str, str], list[dict[str, Any]]] = defaultdict(list)
    for item in added:
        operation = ops_after[item]
        groups[(operation["section"], operation["tag"])].append(operation)
    lines += [f"### Added operations ({len(added)})", ""]
    if not added:
        lines.append("None.")
    for (section, tag), operations in sorted(groups.items()):
        suffix = " *(new group)*" if (section, tag) not in existing_groups else ""
        lines.append(f"**{section} / {tag}**{suffix}")
        lines += [f"- `{op['method']} {op['path']}` — {op['title']}" for op in operations]
        lines.append("")
    lines.append("")

    # Removed operations.
    removed = sorted(ops_before.keys() - ops_after.keys())
    lines += [f"### Removed operations ({len(removed)})", ""]
    if removed:
        lines += ["> [!WARNING]", "> Removed operations break links to their reference pages.", ""]
        lines += limited([f"- `{m} {p}` — {ops_before[(m, p)]['title']} ({ops_before[(m, p)]['section']})" for m, p in removed])
    else:
        lines.append("None.")
    lines.append("")

    # Changed operations and newly dated notices.
    changed: list[str] = []
    notices: list[str] = []
    for item in sorted(ops_before.keys() & ops_after.keys()):
        old_op, new_op = ops_before[item], ops_after[item]
        old_doc, new_doc = read_base(base, f"reference/{old_op['json']}"), read_current(f"reference/{new_op['json']}")
        if old_doc is None or new_doc is None or old_doc == new_doc:
            continue
        changes, dates = operation_changes(old_doc, new_doc)
        label = f"`{new_op['method']} {new_op['path']}` — {new_op['title']}"
        changed.append(f"- {label}: {'; '.join(changes) or 'formatting'}")
        if dates:
            description = plain(only_operation(new_doc).get("description", ""))
            sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", description) if any(d in s for d in dates)]
            notices.append(f"- {label}: {' '.join(sentences)}")

    lines += [f"### Dated notices ({len(notices)})", ""]
    if notices:
        lines += ["> [!IMPORTANT]", "> New dates in operation descriptions, often deprecations or enforcement deadlines.", ""]
        lines += limited(notices)
    else:
        lines.append("None.")
    lines += ["", f"### Changed operations ({len(changed)})", ""]
    lines += limited(changed) or ["None."]
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[1])
    parser.add_argument("--base", default="HEAD", help="Git ref of the committed reference to compare against (default: HEAD)")
    args = parser.parse_args()
    sys.stdout.write(summarise(args.base))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
