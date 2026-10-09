/**
 * The runtime script whitelist: the collection's only embedded code is the
 * Identity post-response handler, on the Identity token requests only.
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { normaliseOperation } from "../../docs-site/docs/assets/request-builder/operation.js";
import { stableId } from "../postman/collection.mjs";
import { EXPIRY_VARIABLE, TOKEN_VARIABLE, identityTokenEvent, identityTokenScriptLines } from "../postman/identity-script.mjs";
import { collection, folders, itemsByOperation, manifest, readJson, requestItems } from "./postman-helpers.mjs";

const itemFor = itemsByOperation(stableId);
const identityIds = new Set(
  manifest.operations
    .filter((entry) => normaliseOperation(readJson("reference", entry.json)).authentication.type === "client-credentials")
    .map((entry) => itemFor(entry).item.id),
);

/** Network, scheduling, sequencing and wider state-changing APIs that must never appear in embedded code. */
const FORBIDDEN = [
  /\bsendRequest\b/, /\brunRequest\b/, /\bsetNextRequest\b/, /\bskipRequest\b/, /\bfetch\b/, /XMLHttpRequest/,
  /\bsetTimeout\b/, /\bsetInterval\b/, /\bsetImmediate\b/, /\brequire\s*\(/, /\bimport\b/, /\beval\b/, /\bFunction\s*\(/,
  /pm\.(globals|collectionVariables|variables|vault|cookies|iterationData)\b/, /\bpostman\./, /\.unset\(/, /\.clear\(/,
];

/** Every object in the collection that carries an `event` or `script` key, with its location. */
function scriptCarriers() {
  const found = [];
  const visit = (node, path) => {
    if (Array.isArray(node)) return node.forEach((child, index) => visit(child, `${path}[${index}]`));
    if (!node || typeof node !== "object") return;
    for (const [key, value] of Object.entries(node)) {
      if (key === "event" || key === "script") found.push({ path: `${path}.${key}`, owner: node });
      visit(value, `${path}.${key}`);
    }
  };
  visit(collection, "$");
  return found;
}

describe("embedded script whitelist", () => {
  it("has no collection-level or folder-level scripts", () => {
    assert.equal(collection.event, undefined);
    for (const folder of folders()) assert.equal(folder.event, undefined, folder.name);
  });

  it("has post-response scripts on the Identity token requests only, and no pre-request scripts", () => {
    assert.equal(identityIds.size, 2, "expected both Identity token requests (GET and POST)");
    for (const { item } of requestItems()) {
      if (identityIds.has(item.id)) {
        assert.deepEqual(item.event, [identityTokenEvent()], item.name);
      } else {
        assert.equal(item.event, undefined, `${item.name} has an event`);
      }
    }
    const carriers = scriptCarriers();
    assert.deepEqual(carriers.map(({ owner }) => owner.id || owner.listen).filter(Boolean).sort(), [...identityIds, "test", "test"].sort());
    for (const { item } of requestItems()) {
      for (const event of item.event || []) assert.equal(event.listen, "test", `${item.name}: only post-response ("test") events are allowed`);
    }
  });

  it("embeds exactly the generated handler, which makes no requests and no other changes", () => {
    const source = identityTokenScriptLines().join("\n");
    for (const pattern of FORBIDDEN) assert.ok(!pattern.test(source), `handler uses ${pattern}`);
    const writes = [...source.matchAll(/pm\.environment\.set\(\s*"([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(writes, [TOKEN_VARIABLE, EXPIRY_VARIABLE]);
    assert.ok(!/pm\.environment\.set\(\s*[^"\s]/.test(source), "environment keys must be literals");
    assert.ok(identityTokenScriptLines().length <= 50, "the handler should stay short and readable");
  });

  it("does not log credentials, the response or the request URL", () => {
    const source = identityTokenScriptLines().join("\n");
    for (const call of source.matchAll(/console\.\w+\(([^;]*)\);/g)) {
      assert.ok(!/access_token|client_secret|pm\.request|pm\.response\.(text|json)|body\b(?!\.)/.test(call[1].replace(/"[^"]*"/g, "")), `logs sensitive data: ${call[0]}`);
    }
  });

  it("contains no other executable content", () => {
    const text = JSON.stringify(collection);
    assert.ok(!/"listen"\s*:\s*"prerequest"/.test(text));
    assert.equal(text.match(/"exec"/g)?.length, identityIds.size);
    assert.equal(text.match(/"type"\s*:\s*"text\/javascript"/g)?.length, identityIds.size);
  });
});
