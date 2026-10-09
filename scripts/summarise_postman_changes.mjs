#!/usr/bin/env node
/**
 * Summarise how the Postman collection and environment template changed
 * between a git commit and the working tree, as Markdown for a pull request
 * description.
 *
 * Reports request counts per API, added, removed and changed requests (inputs,
 * bodies, authentication, media types, descriptions), environment changes,
 * the embedded-script whitelist and whether the build is reproducible. Never
 * prints variable values.
 *
 * Usage:
 *   node scripts/summarise_postman_changes.mjs [--base REF]
 *
 * REF defaults to HEAD, i.e. the committed files before regenerating.
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";

import { COLLECTION_FILE, ENVIRONMENT_FILE, REPO_ROOT, generate, serialise } from "./build_postman_collection.mjs";
import { CONSEQUENCES, READ_VERBS } from "./postman/collection.mjs";
import { identityTokenEvent } from "./postman/identity-script.mjs";

const LIST_LIMIT = 60;

function readBase(ref, file) {
  try {
    return JSON.parse(execFileSync("git", ["show", `${ref}:postman/${file}`], { cwd: REPO_ROOT, encoding: "utf8", maxBuffer: 256 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] }));
  } catch {
    return null;
  }
}

function readCurrent(file) {
  try {
    return JSON.parse(readFileSync(join(REPO_ROOT, "postman", file), "utf8"));
  } catch {
    return null;
  }
}

/** Request items keyed by their stable id, with the facts the report compares. */
function index(collection) {
  const result = new Map();
  for (const family of collection?.item || []) {
    for (const group of family.item || []) {
      for (const item of group.item || []) {
        const request = item.request;
        const body = request.body;
        result.set(item.id, {
          name: item.name,
          location: `${family.name} › ${group.name}`,
          family: family.name,
          url: `${request.url.host.join("")}/${request.url.path.join("/")}`,
          path: (request.url.variable || []).map((row) => row.key),
          query: (request.url.query || []).map((row) => `${row.key}${row.disabled ? "" : " (enabled)"}`),
          headers: request.header.map((row) => `${row.key}${row.disabled ? "" : " (enabled)"}`),
          form: (body?.urlencoded || body?.formdata || []).map((row) => `${row.key}${row.type === "file" ? " (file)" : ""}${row.disabled ? "" : " (enabled)"}`),
          bodyMode: body ? `${body.mode}${body.options?.raw?.language ? ` (${body.options.raw.language})` : ""}` : "none",
          bodyRaw: body?.raw ?? null,
          auth: JSON.stringify(request.auth || "inherited"),
          contentType: request.header.find((row) => row.key.toLowerCase() === "content-type")?.value || null,
          description: request.description,
          event: JSON.stringify(item.event || null),
        });
      }
    }
  }
  return result;
}

function difference(before, after) {
  const added = after.filter((value) => !before.includes(value));
  const removed = before.filter((value) => !after.includes(value));
  return { added, removed };
}

function names(values) {
  return values.map((value) => `\`${value}\``).join(", ");
}

function listChanges(label, before, after) {
  const { added, removed } = difference(before, after);
  const parts = [];
  if (added.length) parts.push(`${label} added ${names(added)}`);
  if (removed.length) parts.push(`${label} removed ${names(removed)}`);
  return parts;
}

function bulleted(lines) {
  const shown = lines.slice(0, LIST_LIMIT);
  if (lines.length > LIST_LIMIT) shown.push(`- …and ${lines.length - LIST_LIMIT} more`);
  return shown;
}

function scriptSummary(collection) {
  const items = [...index(collection).values()];
  const scripted = items.filter((item) => item.event !== "null");
  const expected = JSON.stringify([identityTokenEvent()]);
  const unexpected = scripted.filter((item) => item.event !== expected || !item.url.includes("/identity/oauth/token"));
  const folderEvents = (collection.event ? 1 : 0) + (collection.item || []).flatMap((family) => [family, ...(family.item || [])]).filter((folder) => folder.event).length;
  if (unexpected.length || folderEvents) {
    return `❌ Unexpected scripts: ${unexpected.map((item) => `\`${item.name}\``).join(", ") || "none on requests"}; ${folderEvents} on the collection or folders.`;
  }
  return `✅ ${scripted.length} post-response scripts, all the Identity token handler; no other scripts.`;
}

function unrecognisedVerbs(collection) {
  return [...index(collection).values()]
    .filter((item) => {
      // Names are "METHOD · Title"; "Bulk Delete …" is classified by its second word, as in the exporter.
      const words = item.name.split(" · ").slice(1).join(" · ").split(/\s+/);
      const verb = words[0] === "Bulk" ? words[1] : words[0];
      return !(verb in CONSEQUENCES) && !READ_VERBS.has(verb);
    })
    .map((item) => `\`${item.name}\``);
}

function main() {
  const { values } = parseArgs({ options: { base: { type: "string", default: "HEAD" } } });
  const baseCollection = readBase(values.base, COLLECTION_FILE);
  const baseEnvironment = readBase(values.base, ENVIRONMENT_FILE);
  const collection = readCurrent(COLLECTION_FILE);
  const environment = readCurrent(ENVIRONMENT_FILE);
  const lines = ["## Postman collection", ""];

  if (!collection || !environment) {
    console.log([...lines, "❌ postman/ has no generated collection or environment. Run `make postman`."].join("\n"));
    return;
  }

  const before = index(baseCollection);
  const after = index(collection);
  const families = [...new Set([...before.values(), ...after.values()].map((item) => item.family))];
  lines.push("| API | Before | After |", "|---|---:|---:|");
  for (const family of families) {
    const count = (map) => [...map.values()].filter((item) => item.family === family).length;
    lines.push(`| ${family} | ${count(before)} | ${count(after)} |`);
  }
  lines.push(`| **Total requests** | **${before.size}** | **${after.size}** |`, "");
  if (!baseCollection) lines.push(`_No collection at \`${values.base}\`: every request is new._`, "");

  const added = [...after.keys()].filter((id) => !before.has(id)).map((id) => `- \`${after.get(id).name}\` (${after.get(id).location})`);
  const removed = [...before.keys()].filter((id) => !after.has(id)).map((id) => `- \`${before.get(id).name}\` (${before.get(id).location})`);
  if (baseCollection && added.length) lines.push(`### Added requests (${added.length})`, "", ...bulleted(added), "");
  if (removed.length) lines.push(`### Removed requests (${removed.length})`, "", ...bulleted(removed), "");

  const changed = [];
  for (const [id, now] of after) {
    const then = before.get(id);
    if (!then) continue;
    const parts = [
      ...(then.name !== now.name ? [`renamed from \`${then.name}\``] : []),
      ...(then.location !== now.location ? [`moved from ${then.location}`] : []),
      ...listChanges("path variables", then.path, now.path),
      ...listChanges("query params", then.query, now.query),
      ...listChanges("headers", then.headers, now.headers),
      ...listChanges("form fields", then.form, now.form),
      ...(then.bodyMode !== now.bodyMode ? [`body ${then.bodyMode} → ${now.bodyMode}`] : []),
      ...(then.bodyMode === now.bodyMode && then.bodyRaw !== now.bodyRaw ? ["starter body changed"] : []),
      ...(then.contentType !== now.contentType ? [`Content-Type ${then.contentType || "none"} → ${now.contentType || "none"}`] : []),
      ...(then.auth !== now.auth ? ["**authentication changed**"] : []),
      ...(then.event !== now.event ? ["**script changed**"] : []),
      ...(then.description !== now.description ? ["description changed"] : []),
    ];
    if (parts.length) changed.push(`- \`${now.name}\`: ${parts.join("; ")}`);
  }
  if (changed.length) lines.push(`### Changed requests (${changed.length})`, "", ...bulleted(changed), "");

  const envBefore = new Map((baseEnvironment?.values || []).map((value) => [value.key, value]));
  const envAfter = new Map(environment.values.map((value) => [value.key, value]));
  const envChanges = [
    ...[...envAfter.keys()].filter((key) => !envBefore.has(key)).map((key) => `- Added \`${key}\``),
    ...[...envBefore.keys()].filter((key) => !envAfter.has(key)).map((key) => `- Removed \`${key}\``),
    ...[...envAfter.keys()].filter((key) => envBefore.has(key) && JSON.stringify(envBefore.get(key)) !== JSON.stringify(envAfter.get(key))).map((key) => `- Changed \`${key}\` (type or default)`),
  ];
  if (baseEnvironment && envChanges.length) lines.push("### Environment template", "", ...envChanges, "");

  if (!added.length && !removed.length && !changed.length && !envChanges.length && baseCollection) {
    lines.push("No changes to the collection or the environment template.", "");
  }

  const unrecognised = unrecognisedVerbs(collection);
  if (unrecognised.length) {
    lines.push(
      "### Operations to review",
      "",
      "These operations' names start with a word the exporter doesn't recognise, so they have no **Changes data** note. If they change data, add the word to `CONSEQUENCES` in `scripts/postman/collection.mjs`; if they only read, add it to `READ_VERBS`.",
      "",
      ...bulleted(unrecognised.map((name) => `- ${name}`)),
      "",
    );
  }

  const first = generate();
  const second = generate();
  const deterministic = serialise(first.collection) === serialise(second.collection) && serialise(first.environment) === serialise(second.environment);
  const upToDate = serialise(first.collection) === serialise(collection) && serialise(first.environment) === serialise(environment);
  lines.push(
    "### Checks",
    "",
    `- Requests: ${after.size} for ${first.manifest.operations.length} manifest operations ${after.size === first.manifest.operations.length ? "✅" : "❌"}`,
    `- Scripts: ${scriptSummary(collection)}`,
    `- Reproducible: ${deterministic ? "✅ two builds are byte-for-byte identical" : "❌ two builds differ"}`,
    `- Committed files: ${upToDate ? "✅ match a fresh build of reference/" : "❌ differ from a fresh build: run `make postman`"}`,
  );
  console.log(lines.join("\n"));
}

main();
