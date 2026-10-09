/**
 * Reproducibility and privacy: the committed files match a fresh build byte
 * for byte, rebuilds are identical, and nothing secret, personal,
 * tenant-specific or machine-specific is published.
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { generate, serialise } from "../build_postman_collection.mjs";
import { ENVIRONMENT_VARIABLES } from "../postman/environment.mjs";
import { collection, collectionText, environment, environmentText, freshBuild, manifest, readText, requestItems } from "./postman-helpers.mjs";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

/** The same patterns the site validator uses for credentials and machine paths (docs-site/scripts/check_site.py). */
const SECRET_PATTERNS = {
  "private key": /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  "GitHub token": /\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}\b|\bgithub_pat_[A-Za-z0-9_]{40,}\b/,
  "AWS access key": /\bAKIA[0-9A-Z]{16}\b/,
  "bearer token": /Bearer\s+(?!<ACCESS_TOKEN>|\{\{)[A-Za-z0-9\-_.~+/]{20,}=*/,
  "credential value": /(client_secret|client_id|access_token)(=|"\s*:\s*")(?!<|\{\{|\$\{|example)[A-Za-z0-9\-_.]{16,}/i,
  "local path": /(\/Users\/[A-Za-z0-9._-]+\/|\/home\/[A-Za-z0-9._-]+\/|[A-Z]:\\\\Users\\\\)/,
  "Marketo instance": /\b\d{3}-[A-Za-z]{3}-\d{3}\.mktorest\.com\b/i,
};
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const MUNCHKIN_ID = /\b\d{3}-[A-Za-z]{3}-\d{3}\b/g;

/** Every value a request would send: URL, query, headers, path variables, bodies and auth. */
function sentValues(item) {
  const request = item.request;
  return [
    request.url.raw,
    ...(request.url.query || []).map((row) => row.value),
    ...(request.url.variable || []).map((row) => row.value),
    ...request.header.map((row) => row.value),
    request.body?.raw,
    ...(request.body?.urlencoded || []).map((row) => row.value),
    ...(request.body?.formdata || []).map((row) => row.value ?? row.src),
    ...(request.auth?.apikey || []).map((row) => row.value),
  ].filter((value) => value !== undefined && value !== "");
}

describe("reproducible output", () => {
  it("matches a fresh build from reference/ byte for byte", () => {
    const { collection: built, environment: builtEnvironment } = freshBuild();
    assert.ok(serialise(built) === collectionText, "postman/ is out of date: run make postman");
    assert.ok(serialise(builtEnvironment) === environmentText, "postman/ is out of date: run make postman");
  });

  it("is identical across builds", () => {
    const first = generate();
    const second = generate();
    assert.equal(serialise(first.collection), serialise(second.collection));
    assert.equal(serialise(first.environment), serialise(second.environment));
  });

  it("uses stable, unique, name-based identifiers and no timestamps", () => {
    const ids = [collection.info._postman_id, environment.id];
    const visit = (node) => {
      for (const child of node.item || []) {
        ids.push(child.id);
        visit(child);
      }
    };
    visit(collection);
    for (const id of ids) assert.match(id, UUID);
    assert.equal(new Set(ids).size, ids.length);
    for (const key of ["_postman_exported_at", "_postman_exported_using", "updatedAt", "createdAt", "timestamp", "_exporter_id", "fork"]) {
      assert.ok(!collectionText.includes(`"${key}"`), `collection has ${key}`);
      assert.ok(!environmentText.includes(`"${key}"`), `environment has ${key}`);
    }
  });

  it("ends files with a newline and uses two-space indentation", () => {
    for (const text of [collectionText, environmentText]) {
      assert.ok(text.endsWith("}\n"));
      assert.equal(text, `${JSON.stringify(JSON.parse(text), null, 2)}\n`);
    }
  });
});

describe("environment template", () => {
  it("has exactly the documented tenant and credential variables", () => {
    assert.equal(environment._postman_variable_scope, "environment");
    assert.equal(typeof environment.name, "string");
    assert.deepEqual(environment.values.map((value) => value.key), ENVIRONMENT_VARIABLES.map((variable) => variable.key));
    for (const value of environment.values) {
      assert.deepEqual(Object.keys(value), ["key", "value", "type", "enabled"]);
      assert.equal(value.enabled, true);
    }
    for (const key of ["clientSecret", "accessToken"]) {
      assert.equal(environment.values.find((value) => value.key === key).type, "secret");
    }
  });

  it("contains no values except the Data Ingestion host from the source specification", () => {
    const ingestion = manifest.operations.find((entry) => entry.section === "data-ingestion");
    const document = JSON.parse(readText("reference", ingestion.json));
    for (const value of environment.values) {
      if (value.key === "ingestionBaseUrl") assert.equal(value.value, `https://${document.host}`);
      else assert.equal(value.value, "", `${value.key} must be empty`);
    }
  });

  it("documents every variable in postman/README.md", () => {
    const readme = readText("postman", "README.md");
    for (const variable of environment.values) assert.ok(readme.includes(`\`${variable.key}\``), variable.key);
  });

  it("covers every variable the collection refers to", () => {
    const keys = new Set(environment.values.map((value) => value.key));
    const referenced = new Set([...collectionText.matchAll(/\{\{([A-Za-z0-9_]+)\}\}/g)].map((match) => match[1]));
    for (const name of referenced) assert.ok(keys.has(name), `{{${name}}} is not in the environment template`);
  });
});

describe("privacy", () => {
  it("publishes no secrets, local paths or instance hosts", () => {
    for (const [name, text] of [["collection", collectionText], ["environment", environmentText]]) {
      for (const [label, pattern] of Object.entries(SECRET_PATTERNS)) {
        assert.ok(!pattern.test(text), `${name} contains a ${label}: ${text.match(pattern)?.[0]}`);
      }
    }
  });

  it("puts no email addresses or Munchkin IDs in anything a request sends or the environment holds", () => {
    // Starter bodies are checked property by property in postman-export.test.mjs.
    const values = [...requestItems().flatMap(({ item }) => sentValues(item)), ...environment.values.map((value) => value.value)];
    for (const value of values) {
      assert.ok(!value.match(EMAIL), `email address in a request value: ${value}`);
      assert.ok(!value.match(MUNCHKIN_ID), `Munchkin ID in a request value: ${value}`);
    }
  });

  it("only republishes email addresses and Munchkin-style IDs that appear verbatim in Adobe's descriptions", () => {
    // Adobe's descriptions contain a few illustrative values (e.g. a sample CSV row); they are kept as published.
    const sourceText = manifest.operations.map((entry) => readText("reference", entry.json)).join("\n");
    for (const match of [...collectionText.matchAll(EMAIL), ...collectionText.matchAll(MUNCHKIN_ID)]) {
      assert.ok(sourceText.includes(match[0]), `${match[0]} is not from the source specifications`);
    }
  });
});
