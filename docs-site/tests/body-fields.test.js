/**
 * The Fields view must never change a request by itself: reading its tree gives
 * back the value it was built from, for every body in the library, and edits
 * produce exactly what the JSON view would.
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { addItem, buildNode, nodeForMessage, readNode, removeItem, setNodeText, supportsFields } from "../docs/assets/request-builder/body-fields.js";
import { generateMock } from "../docs/assets/request-builder/mock.js";
import { normaliseOperation } from "../docs/assets/request-builder/operation.js";
import { buildRequest, initialBodyValue } from "../docs/assets/request-builder/request.js";
import { controlFor } from "../docs/assets/request-builder/validate.js";
import { allOperationFiles, loadOperation, readJson } from "./helpers.js";

const operations = allOperationFiles().map((file) => normaliseOperation(readJson("reference", file)));
const jsonBodies = operations.filter((operation) => operation.body?.kind === "json");
const nestedFormFields = operations.flatMap((operation) => (operation.body?.fields || [])
  .filter((field) => controlFor(field) === "json" && supportsFields(field.schema, operation.resolver))
  .map((field) => ({ operation, field })));

const child = (node, name) => node.children.find((candidate) => candidate.name === name);
const tree = (schema, value) => buildNode(schema, { flatten: (s) => s, deref: (s) => s }, { root: true }, value);

describe("every body in the library", () => {
  it("finds the bodies it should", () => {
    assert.ok(jsonBodies.length > 50);
    assert.ok(nestedFormFields.length > 20);
    for (const operation of jsonBodies) assert.ok(supportsFields(operation.body.schema, operation.resolver), operation.title);
  });

  for (const operation of jsonBodies) {
    it(`${operation.title}: keeps its starter and a fully mocked body`, () => {
      const starter = initialBodyValue(operation, generateMock);
      assert.deepEqual(readNode(buildNode(operation.body.schema, operation.resolver, { root: true }, starter)), starter);
      const full = generateMock(operation.body.schema, operation.resolver, {});
      assert.deepEqual(readNode(buildNode(operation.body.schema, operation.resolver, { root: true }, full)), full);
    });
  }

  it("keeps every nested form value", () => {
    for (const { operation, field } of nestedFormFields) {
      const value = generateMock(field.schema, operation.resolver, { name: field.name });
      assert.deepEqual(readNode(buildNode(field.schema, operation.resolver, { root: true }, value)), value, `${operation.title}: ${field.name}`);
    }
  });

  it("builds the same request from Fields as from the starter JSON", () => {
    for (const operation of jsonBodies) {
      const starter = initialBodyValue(operation, generateMock);
      const value = readNode(buildNode(operation.body.schema, operation.resolver, { root: true }, starter));
      const fields = buildRequest(operation, { values: {}, bodyText: JSON.stringify(value) });
      const json = buildRequest(operation, { values: {}, bodyText: JSON.stringify(starter) });
      assert.deepEqual(fields.body?.value, json.body?.value, operation.title);
      assert.deepEqual(fields.errors, json.errors, operation.title);
    }
  });
});

describe("editing", () => {
  const schema = {
    type: "object",
    required: ["id", "input"],
    properties: {
      id: { type: "integer" },
      ratio: { type: "number" },
      name: { type: "string" },
      on: { type: "boolean" },
      kind: { type: "string", enum: ["a", "b"] },
      level: { type: "integer", enum: [1, 2] },
      tags: { type: "array", items: { type: "string" } },
      input: { type: "array", items: { type: "object", required: ["leadId"], properties: { leadId: { type: "integer" } } } },
      folder: { type: "object", properties: { id: { type: "integer" }, type: { type: "string" } } },
      free: { type: "object" },
    },
  };

  it("types values from the schema", () => {
    const root = tree(schema, {});
    setNodeText(child(root, "id"), "12");
    setNodeText(child(root, "ratio"), "1.5");
    setNodeText(child(root, "name"), "12");
    setNodeText(child(root, "on"), "false");
    setNodeText(child(root, "kind"), "b");
    setNodeText(child(root, "level"), "2");
    assert.deepEqual(readNode(root), { id: 12, ratio: 1.5, name: "12", on: false, kind: "b", level: 2, input: [] });
  });

  it("keeps what can't be typed, for validation to report", () => {
    const root = tree(schema, {});
    setNodeText(child(root, "id"), "twelve");
    assert.equal(readNode(root).id, "twelve");
  });

  it("removes a value when it's cleared", () => {
    const root = tree(schema, { id: 1, input: [], name: "x", folder: { id: 1 } });
    setNodeText(child(root, "name"), "");
    setNodeText(child(child(root, "folder"), "id"), "");
    assert.deepEqual(readNode(root), { id: 1, input: [] });
  });

  it("adds and removes array items", () => {
    const root = tree(schema, { id: 1, input: [{ leadId: 1 }] });
    const input = child(root, "input");
    const added = addItem(input, { flatten: (s) => s, deref: (s) => s });
    assert.deepEqual(readNode(root).input, [{ leadId: 1 }, {}]);
    setNodeText(child(added, "leadId"), "2");
    assert.deepEqual(readNode(root).input, [{ leadId: 1 }, { leadId: 2 }]);
    removeItem(input, input.items[0]);
    assert.deepEqual(readNode(root).input, [{ leadId: 2 }]);
  });

  it("leaves empty scalar items out", () => {
    const root = tree(schema, { id: 1, input: [] });
    const tags = child(root, "tags");
    const item = addItem(tags, { flatten: (s) => s, deref: (s) => s });
    assert.equal(readNode(root).tags, undefined);
    setNodeText(item, "x");
    assert.deepEqual(readNode(root).tags, ["x"]);
  });

  it("carries through what the schema doesn't describe", () => {
    const value = { id: 1, input: [], extra: { a: 1 }, name: 5, folder: "oops", free: { any: [1] }, on: null };
    assert.deepEqual(readNode(tree(schema, value)), value);
    assert.equal(child(tree(schema, value), "folder").kind, "raw");
  });

  it("keeps an empty string and an empty list that were deliberately there", () => {
    const value = { id: 1, input: [], name: "", tags: [], folder: {} };
    assert.deepEqual(readNode(tree(schema, value)), value);
  });

  it("keeps raw JSON that doesn't parse, for validation to report", () => {
    const root = tree(schema, { id: 1, input: [] });
    setNodeText(child(root, "free"), "{ not json");
    assert.equal(readNode(root).free, "{ not json");
    setNodeText(child(root, "free"), '{"a":1}');
    assert.deepEqual(readNode(root).free, { a: 1 });
  });

  it("keeps response-only properties out of the form", () => {
    const withSeq = { type: "object", properties: { id: { type: "integer" }, seq: { type: "integer", description: "This field should only be part of responses and should not be submitted" } } };
    assert.deepEqual(tree(withSeq, {}).children.map((node) => node.name), ["id"]);
    assert.deepEqual(readNode(tree(withSeq, { seq: 1 })), { seq: 1 });
  });

  it("finds the field a validation message is about", () => {
    const root = tree(schema, { id: 1, input: [{}] });
    assert.equal(nodeForMessage(root, "body.input[0].leadId is required.", "body").name, "leadId");
    assert.equal(nodeForMessage(root, "body.id must be an integer.", "body").name, "id");
    assert.equal(nodeForMessage(root, "body must be an object.", "body"), root);
    assert.equal(nodeForMessage(root, "body.missing is required.", "body"), null);
    assert.equal(nodeForMessage(root, "Request body is required.", "body"), null);
  });

  it("uses the real Add Leads to List body", () => {
    const operation = normaliseOperation(loadOperation("data-ingestion/lists/add-leads-to-list"));
    assert.equal(operation.body.kind, "json");
    assert.ok(supportsFields(operation.body.schema, operation.resolver));
  });
});
