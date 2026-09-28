import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createResolver } from "../docs/assets/request-builder/schema.js";
import { normaliseOperation } from "../docs/assets/request-builder/operation.js";
import {
  MOCK_DATE,
  MOCK_DATE_TIME,
  defaultResponseCode,
  generateMock,
  generateResponseMock,
  humanize,
} from "../docs/assets/request-builder/mock.js";
import { highlightJson } from "../docs/assets/request-builder/highlight.js";
import { loadOpenApi3Operation, loadOperation } from "./helpers.js";

describe("generateMock", () => {
  it("generates readable primitives from types, formats and names", () => {
    const schema = {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        email: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string" },
        birthday: { type: "string", format: "date" },
        url: { type: "string" },
        active: { type: "boolean" },
        score: { type: "number" },
        preHeader: { type: "string" },
      },
    };
    assert.deepEqual(generateMock(schema), {
      id: 1234,
      name: "Example Name",
      email: "example@example.com",
      createdAt: MOCK_DATE_TIME,
      updatedAt: MOCK_DATE_TIME,
      birthday: MOCK_DATE,
      url: "https://example.com",
      active: true,
      score: 1.5,
      preHeader: "Example Pre Header",
    });
  });

  it("prefers examples, defaults and the first enum value", () => {
    const schema = {
      type: "object",
      properties: {
        code: { type: "string", example: "4000801" },
        action: { type: "string", enum: ["createOnly", "updateOnly"], default: "updateOnly" },
        status: { type: "string", enum: ["approved", "draft"] },
        version: { type: "integer", enum: [1, 2] },
      },
    };
    assert.deepEqual(generateMock(schema), { code: "4000801", action: "updateOnly", status: "approved", version: 1 });
  });

  it("generates two items for the outer array and one for nested arrays", () => {
    const schema = {
      type: "array",
      items: {
        type: "object",
        properties: { id: { type: "integer" }, name: { type: "string" }, tags: { type: "array", items: { type: "string" } } },
      },
    };
    assert.deepEqual(generateMock(schema), [
      { id: 1234, name: "Example Name", tags: ["Example Tag"] },
      { id: 1235, name: "Example Name 2", tags: ["Example Tag"] },
    ]);
  });

  it("respects minItems, maxItems and numeric bounds", () => {
    assert.equal(generateMock({ type: "array", minItems: 3, items: { type: "string" } }).length, 3);
    assert.equal(generateMock({ type: "array", maxItems: 1, items: { type: "string" } }).length, 1);
    assert.equal(generateMock({ type: "integer", minimum: 10 }), 10);
  });

  it("resolves nested $ref schemas", () => {
    const doc = loadOperation("asset/emails/get-email-by-id");
    const mock = generateMock({ $ref: "#/definitions/EmailResponse" }, createResolver(doc));
    assert.deepEqual(mock.folder, { id: 1234, type: "Folder" });
    assert.deepEqual(mock.fromEmail, { type: "Example Type", value: "Example Value" });
    assert.equal(mock.version, 1);
    assert.equal(mock.createdAt, MOCK_DATE_TIME);
    assert.equal(mock.ccFields.length, 2);
  });

  it("terminates on recursive models", () => {
    const resolver = createResolver({
      definitions: { Node: { type: "object", properties: { name: { type: "string" }, child: { $ref: "#/definitions/Node" } } } },
    });
    assert.deepEqual(generateMock({ $ref: "#/definitions/Node" }, resolver), { name: "Example Name" });
  });

  it("is deterministic", () => {
    const doc = loadOperation("core/leads/get-leads-by-filter-type");
    const op = normaliseOperation(doc);
    const first = JSON.stringify(generateResponseMock(op, "200"));
    const second = JSON.stringify(generateResponseMock(normaliseOperation(doc), "200"));
    assert.equal(first, second);
  });

  it("humanizes property names", () => {
    assert.equal(humanize("error_code"), "Error Code");
    assert.equal(humanize("publishToMSI"), "Publish To MSI");
  });
});

describe("generateResponseMock", () => {
  it("follows the Marketo envelope for successful responses", () => {
    const op = normaliseOperation(loadOperation("asset/emails/get-email-by-id"));
    assert.equal(defaultResponseCode(op), "200");
    const mock = generateResponseMock(op, "200");
    assert.equal(mock.source, "schema");
    assert.deepEqual(Object.keys(mock.body), ["errors", "requestId", "result", "success", "warnings"]);
    assert.equal(mock.body.success, true);
    assert.deepEqual(mock.body.errors, []);
    assert.deepEqual(mock.body.warnings, []);
    assert.equal(mock.body.requestId, "1a2b#3c4d5e6f7a8");
    assert.equal(mock.body.result.length, 2);
    assert.equal(mock.body.result[0].id, 1234);
  });

  it("uses documented examples for OpenAPI 3 error responses", () => {
    const op = normaliseOperation(loadOpenApi3Operation("/subscriptions/{munchkinId}/persons"));
    assert.equal(defaultResponseCode(op), "202");
    assert.deepEqual(generateResponseMock(op, "202"), {
      status: "202",
      description: "Accepted – request accepted for async processing",
      contentType: "application/json",
      body: undefined,
      source: "none",
    });
    const error = generateResponseMock(op, "400");
    assert.equal(error.source, "schema");
    assert.equal(typeof error.body, "object");
  });

  it("mocks top-level array responses", () => {
    const op = normaliseOperation({
      swagger: "2.0",
      definitions: { Item: { type: "object", properties: { id: { type: "integer" } } } },
      paths: { "/x": { get: { responses: { 200: { description: "OK", schema: { type: "array", items: { $ref: "#/definitions/Item" } } } } } } },
    });
    assert.deepEqual(generateResponseMock(op, "200").body, [{ id: 1234 }, { id: 1235 }]);
    assert.equal(op.responses[0].refName, "Item");
  });

  it("uses Swagger 2 response examples when present", () => {
    const op = normaliseOperation({
      swagger: "2.0",
      paths: { "/x": { get: { responses: { 200: { description: "OK", schema: { type: "object" }, examples: { "application/json": { ok: 1 } } } } } } },
    });
    assert.deepEqual(generateResponseMock(op, "200"), { status: "200", description: "OK", contentType: "application/json", body: { ok: 1 }, source: "example" });
  });

  it("rejects undocumented status codes", () => {
    const op = normaliseOperation(loadOperation("asset/emails/get-email-by-id"));
    assert.throws(() => generateResponseMock(op, "500"), /not documented/);
  });
});

describe("highlightJson", () => {
  it("escapes HTML and tags tokens", () => {
    const html = highlightJson(JSON.stringify({ "<k>": "<script>", n: 1, ok: true, none: null }));
    assert.ok(!html.includes("<script>"));
    assert.ok(html.includes('<span class="nt">&quot;&lt;k&gt;&quot;</span>'));
    assert.ok(html.includes('<span class="s2">&quot;&lt;script&gt;&quot;</span>'));
    assert.ok(html.includes('<span class="mi">1</span>'));
    assert.ok(html.includes('<span class="kc">true</span>'));
    assert.ok(html.includes('<span class="kc">null</span>'));
  });
});
