import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createResolver, describeType, refName } from "../docs/assets/request-builder/schema.js";
import { PLACEHOLDERS, normaliseOperation } from "../docs/assets/request-builder/operation.js";
import { loadOpenApi3Operation, loadOperation } from "./helpers.js";

describe("schema resolver", () => {
  it("resolves Swagger 2 definitions and keeps sibling keywords", () => {
    const doc = loadOperation("asset/emails/get-email-by-id");
    const resolver = createResolver(doc);
    const folder = resolver.deref(doc.definitions.EmailResponse.properties.folder);
    assert.equal(folder.refName, "Folder");
    assert.deepEqual(folder.enum, undefined);
    assert.deepEqual(Object.keys(folder.properties), ["id", "type"]);
    assert.match(folder.description, /parent folder/);
  });

  it("resolves OpenAPI 3 component schemas", () => {
    const doc = loadOpenApi3Operation("/subscriptions/{munchkinId}/persons");
    const resolver = createResolver(doc);
    const request = resolver.flatten({ $ref: "#/components/schemas/SyncPersonsRequest" });
    assert.equal(request.refName, "SyncPersonsRequest");
    assert.equal(request.type, "object");
    assert.ok(request.properties.persons);
  });

  it("decodes JSON pointer escapes", () => {
    const resolver = createResolver({ definitions: { "a/b~c": { type: "string" } } });
    assert.equal(resolver.deref({ $ref: "#/definitions/a~1b~0c" }).type, "string");
    assert.equal(refName("#/definitions/a~1b~0c"), "a/b~c");
  });

  it("merges allOf into a single object schema", () => {
    const resolver = createResolver({
      definitions: {
        Base: { type: "object", required: ["id"], properties: { id: { type: "integer" } } },
        Named: { allOf: [{ $ref: "#/definitions/Base" }, { required: ["name"], properties: { name: { type: "string" } } }] },
      },
    });
    const merged = resolver.flatten({ $ref: "#/definitions/Named" });
    assert.equal(merged.type, "object");
    assert.deepEqual(Object.keys(merged.properties), ["id", "name"]);
    assert.deepEqual(merged.required, ["id", "name"]);
  });

  it("stops on circular references", () => {
    const resolver = createResolver({ definitions: { A: { $ref: "#/definitions/B" }, B: { $ref: "#/definitions/A" } } });
    assert.equal(resolver.deref({ $ref: "#/definitions/A" }).circular, true);
  });

  it("throws on unresolvable and external references", () => {
    const resolver = createResolver({ definitions: {} });
    assert.throws(() => resolver.deref({ $ref: "#/definitions/Missing" }), /Unresolvable/);
    assert.throws(() => resolver.deref({ $ref: "other.json#/definitions/X" }), /local/);
  });

  it("describes types", () => {
    const doc = loadOperation("asset/emails/get-email-by-id");
    const resolver = createResolver(doc);
    assert.equal(describeType({ type: "integer", format: "int32" }), "integer (int32)");
    assert.equal(describeType(doc.definitions.ResponseOfEmailResponse.properties.result, resolver), "array of EmailResponse");
  });
});

describe("normaliseOperation (Swagger 2)", () => {
  it("extracts method, path, parameters and responses", () => {
    const op = normaliseOperation(loadOperation("asset/emails/get-email-by-id"));
    assert.equal(op.format, "swagger2");
    assert.equal(op.method, "GET");
    assert.equal(op.path, "/rest/asset/v1/email/{id}.json");
    assert.equal(op.operationId, "getEmailByIdUsingGET");
    assert.equal(op.defaultBaseUrl, null, "localhost hosts fall back to a placeholder");

    const [id, status] = op.fields;
    assert.deepEqual([id.key, id.required, id.schema.type], ["path:id", true, "integer"]);
    assert.deepEqual([status.key, status.required, status.schema.enum], ["query:status", false, ["approved", "draft"]]);

    assert.equal(op.body, null);
    assert.deepEqual(op.responses.map((response) => response.code), ["200"]);
    assert.equal(op.responses[0].refName, "ResponseOfEmailResponse");
    assert.equal(op.authentication.type, "bearer");
  });

  it("expands a form-encoded body schema into fields", () => {
    const op = normaliseOperation(loadOperation("asset/snippets/update-snippet-metadata"));
    assert.equal(op.body.kind, "form");
    assert.equal(op.body.refName, "UpdateSnippetRequest");
    assert.ok(op.body.fields.length > 0);
    assert.ok(op.body.fields.every((field) => field.in === "form"));
  });

  it("treats a primitive form body as a single named field", () => {
    const op = normaliseOperation(loadOperation("asset/emails/rearrange-email-modules"));
    assert.equal(op.body.kind, "form");
    assert.deepEqual(op.body.fields.map((field) => [field.name, field.schema.type]), [["positions", "string"]]);
  });

  it("maps formData file parameters to a multipart body", () => {
    const op = normaliseOperation(loadOperation("core/bulk-import-program-members/import-program-members"));
    assert.equal(op.body.kind, "multipart");
    assert.deepEqual(op.body.fields.map((field) => [field.name, field.schema.type]), [["file", "file"]]);
  });

  it("marks OAuth client credentials as placeholders", () => {
    const op = normaliseOperation(loadOperation("identity/identity/identity"));
    const credentials = Object.fromEntries(op.fields.filter((field) => field.credential).map((field) => [field.name, field.credential]));
    assert.deepEqual(credentials, { client_id: PLACEHOLDERS.clientId, client_secret: PLACEHOLDERS.clientSecret });
    assert.equal(op.authentication.type, "client-credentials");
  });

  it("uses the declared token header for Data Ingestion", () => {
    const op = normaliseOperation(loadOperation("data-ingestion/companies/sync-companies"));
    assert.equal(op.defaultBaseUrl, "https://mkto-ingestion-api.adobe.io");
    assert.deepEqual(op.authentication, { type: "header", header: ["X-Mkto-User-Token", PLACEHOLDERS.accessToken] });
    assert.equal(op.body.kind, "json");
    assert.equal(op.body.example.action, "createOrUpdate");
  });
});

describe("normaliseOperation (OpenAPI 3)", () => {
  it("reads parameters, requestBody and response content", () => {
    const op = normaliseOperation(loadOpenApi3Operation("/subscriptions/{munchkinId}/persons"));
    assert.equal(op.format, "openapi3");
    assert.equal(op.method, "POST");
    assert.equal(op.defaultBaseUrl, "https://mkto-ingestion-api.adobe.io");
    assert.equal(op.fields.find((field) => field.name === "munchkinId").schema.type, "string");
    assert.equal(op.body.kind, "json");
    assert.equal(op.body.contentType, "application/json");
    assert.equal(op.body.refName, "SyncPersonsRequest");
    assert.equal(op.body.example.priority, "high");
    assert.deepEqual(op.responses.map((response) => response.code), ["202", "400", "401"]);
    assert.equal(op.responses[1].refName, "ErrorResponse");
    assert.equal(op.responses[0].schema, null);
  });

  it("maps style/explode to array serialisation", () => {
    const doc = {
      openapi: "3.0.1",
      paths: {
        "/x": {
          get: {
            parameters: [
              { name: "a", in: "query", schema: { type: "array", items: { type: "string" } } },
              { name: "b", in: "query", explode: false, schema: { type: "array", items: { type: "string" } } },
              { name: "c", in: "query", style: "pipeDelimited", explode: false, schema: { type: "array", items: { type: "string" } } },
            ],
            responses: {},
          },
        },
      },
    };
    const op = normaliseOperation(doc);
    assert.deepEqual(op.fields.map((field) => field.arrayStyle), ["multi", "csv", "pipes"]);
  });
});
