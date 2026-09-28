import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { normaliseOperation } from "../docs/assets/request-builder/operation.js";
import { buildRequest, encodeQueryComponent, substitutePath } from "../docs/assets/request-builder/request.js";
import { constraintErrors, parseBaseUrl, parseField, validateValue } from "../docs/assets/request-builder/validate.js";
import { generateCurl, generateJavaScript, generatePython } from "../docs/assets/request-builder/codegen.js";
import { loadOpenApi3Operation, loadOperation } from "./helpers.js";

const getEmail = () => normaliseOperation(loadOperation("asset/emails/get-email-by-id"));
const errorKeys = (request) => request.errors.map((error) => error.key);

describe("URL construction", () => {
  it("substitutes and encodes path parameters", () => {
    assert.equal(substitutePath("/a/{id}/b/{name}.json", { id: "12", name: "x/y z" }), "/a/12/b/x%2Fy%20z.json");
    assert.equal(substitutePath("/a/{id}.json", {}), "/a/{id}.json");
  });

  it("encodes query components but keeps placeholders readable", () => {
    assert.equal(encodeQueryComponent("a b&c=d,e"), "a%20b%26c%3Dd,e");
    assert.equal(encodeQueryComponent("<CLIENT_SECRET>"), "<CLIENT_SECRET>");
  });

  it("builds the documented example URL", () => {
    const request = buildRequest(getEmail(), {
      baseUrl: "https://123-ABC-456.mktorest.com/",
      values: { "path:id": "1234", "query:status": "draft" },
    });
    assert.equal(request.valid, true);
    assert.equal(request.url, "https://123-ABC-456.mktorest.com/rest/asset/v1/email/1234.json?status=draft");
    assert.deepEqual(request.headers, [["Authorization", "Bearer <ACCESS_TOKEN>"]]);
  });

  it("uses a placeholder base URL when none is entered", () => {
    const request = buildRequest(getEmail(), { values: { "path:id": "1" } });
    assert.equal(request.url, "<MARKETO_BASE_URL>/rest/asset/v1/email/1.json");
  });

  it("removes /rest and /identity copied from Admin > Web Services", () => {
    const rest = parseBaseUrl("https://123-ABC-456.mktorest.com/rest/");
    assert.equal(rest.value, "https://123-ABC-456.mktorest.com");
    assert.equal(rest.notes.length, 1);
    assert.equal(parseBaseUrl("https://123-ABC-456.mktorest.com/identity").value, "https://123-ABC-456.mktorest.com");
    assert.deepEqual(parseBaseUrl("https://proxy.example.com/marketo/rest").notes, []);
    const request = buildRequest(getEmail(), { baseUrl: "https://123-ABC-456.mktorest.com/rest", values: { "path:id": "1" } });
    assert.equal(request.url, "https://123-ABC-456.mktorest.com/rest/asset/v1/email/1.json");
  });

  it("rejects base URLs containing credentials, queries or unsupported schemes", () => {
    assert.deepEqual(parseBaseUrl("https://user:pass@example.com").errors, ["Base URL must not contain credentials."]);
    assert.equal(parseBaseUrl("https://example.com/?token=x").errors.length, 1);
    assert.equal(parseBaseUrl("ftp://example.com").errors.length, 1);
    assert.equal(parseBaseUrl("not a url").errors.length, 1);
  });

  it("serialises Marketo REST query arrays comma-separated despite collectionFormat multi", () => {
    const op = normaliseOperation(loadOperation("core/leads/get-leads-by-filter-type"));
    assert.deepEqual(op.fields.filter((field) => field.arrayStyle).map((field) => [field.name, field.arrayStyle]), [
      ["filterValues", "csv"],
      ["fields", "csv"],
    ]);
    const request = buildRequest(op, {
      values: { "query:filterType": "email", "query:filterValues": "a@example.com\nb@example.com", "query:fields": "firstName\nlastName" },
    });
    assert.equal(request.url, "<MARKETO_BASE_URL>/rest/v1/leads.json?filterType=email&filterValues=a%40example.com,b%40example.com&fields=firstName,lastName");
    assert.ok(generatePython(request).includes('"filterValues": "a@example.com,b@example.com",'));
  });

  it("applies comma-separated lists to undescribed Lead Database parameters", () => {
    const op = normaliseOperation(loadOperation("core/static-lists/remove-from-list"));
    const request = buildRequest(op, { values: { "path:listId": "1001", "query:id": "1\n2" } });
    assert.match(request.url, /\/rest\/v1\/lists\/1001\/leads\.json\?id=1,2$/);
  });

  it("keeps repeated keys where the API declares multi without a comma-separated list", () => {
    const op = normaliseOperation(loadOperation("asset/emails-new/list-emails"));
    assert.equal(op.fields.find((field) => field.name === "status").arrayStyle, "multi");
    const request = buildRequest(op, { values: { "query:status": "approved\ndraft" } });
    assert.match(request.url, /status=approved&status=draft/);
  });

  it("serialises csv arrays as a single joined value", () => {
    const op = normaliseOperation({
      swagger: "2.0",
      paths: { "/x": { get: { parameters: [{ name: "ids", in: "query", type: "array", items: { type: "integer" } }], responses: {} } } },
    });
    const request = buildRequest(op, { values: { "query:ids": "1\n2\n3" } });
    assert.equal(request.url, "<MARKETO_BASE_URL>/x?ids=1,2,3");
  });
});

describe("validation", () => {
  it("requires path parameters", () => {
    const request = buildRequest(getEmail(), {});
    assert.equal(request.valid, false);
    assert.deepEqual(errorKeys(request), ["path:id"]);
    assert.equal(request.path, "/rest/asset/v1/email/{id}.json");
  });

  it("rejects non-integer values", () => {
    const request = buildRequest(getEmail(), { values: { "path:id": "12a" } });
    assert.deepEqual(request.errors, [{ key: "path:id", message: "id must be a whole number." }]);
  });

  it("rejects values outside an enum", () => {
    const request = buildRequest(getEmail(), { values: { "path:id": "1", "query:status": "published" } });
    assert.deepEqual(request.errors, [{ key: "query:status", message: "status must be one of: approved, draft." }]);
  });

  it("validates array items", () => {
    const field = { name: "ids", in: "query", required: false, schema: { type: "array", items: { type: "integer" } } };
    assert.deepEqual(parseField(field, "1\nx").errors, ["ids item 2 must be a whole number."]);
  });

  it("applies string constraints inside JSON bodies (InviteUserRequest.emailAddress)", () => {
    const op = normaliseOperation(loadOperation("user-management/user-management/invite-user"));
    const body = (emailAddress) => JSON.stringify({
      emailAddress, firstName: "Ada", lastName: "Lovelace", userRoleWorkspaces: [{ accessRoleId: 1, workspaceId: 1 }],
    });
    const messages = (emailAddress) => buildRequest(op, { bodyText: body(emailAddress) }).errors.map((error) => error.message);
    assert.ok(messages("banana").some((message) => message.startsWith("body.emailAddress must match the pattern")));
    assert.ok(messages("").includes("body.emailAddress must be at least 1 characters."));
    assert.deepEqual(messages("ada@example.com"), []);
  });

  it("applies numeric, length and item constraints to nested values", () => {
    const schema = {
      type: "object",
      properties: {
        batch: { type: "integer", minimum: 1, maximum: 300 },
        ratio: { type: "number", minimum: 0, exclusiveMinimum: true },
        score: { type: "number", exclusiveMaximum: 10 },
        code: { type: "string", minLength: 2, maxLength: 3 },
        ids: { type: "array", minItems: 1, maxItems: 2, items: { type: "string", pattern: "^[0-9]+$" } },
      },
    };
    assert.deepEqual(validateValue({ batch: 301, ratio: 0, score: 10, code: "a", ids: [] }, schema, null), [
      "body.batch must be at most 300.",
      "body.ratio must be greater than 0.",
      "body.score must be less than 10.",
      "body.code must be at least 2 characters.",
      "body.ids needs at least 1 items.",
    ]);
    assert.deepEqual(validateValue({ ids: ["1", "x", "3"] }, schema, null), [
      "body.ids allows at most 2 items.",
      "body.ids[1] must match the pattern ^[0-9]+$.",
    ]);
    assert.deepEqual(validateValue({ batch: 300, ratio: 0.5, score: 9.9, code: "abc", ids: ["1"] }, schema, null), []);
  });

  it("compiles patterns written for other regex engines", () => {
    // \' is valid in Java but a syntax error in JavaScript with the u flag.
    assert.deepEqual(constraintErrors("it's", { type: "string", pattern: "^[a-z\\']+$" }, "value"), []);
    assert.equal(constraintErrors("IT", { type: "string", pattern: "^[a-z\\']+$" }, "value").length, 1);
  });

  it("applies bounds only when the specification defines them", () => {
    const field = { name: "batchSize", in: "query", schema: { type: "integer", minimum: 1, maximum: 300 } };
    assert.deepEqual(parseField(field, "301").errors, ["batchSize must be at most 300."]);
    assert.deepEqual(parseField({ ...field, schema: { type: "integer" } }, "301").errors, []);
  });
});

describe("request bodies", () => {
  it("validates JSON syntax and required properties", () => {
    const op = normaliseOperation(loadOperation("data-ingestion/companies/sync-companies"));
    const values = { "path:munchkinId": "123-ABC-456" };

    const invalid = buildRequest(op, { values, bodyText: "{" });
    assert.deepEqual(errorKeys(invalid), ["body"]);
    assert.match(invalid.errors[0].message, /not valid JSON/);

    const missing = buildRequest(op, { values, bodyText: JSON.stringify({ action: "createOnly" }) });
    assert.deepEqual(missing.errors, [{ key: "body", message: "body.input is required." }]);

    const wrongEnum = buildRequest(op, { values, bodyText: JSON.stringify({ input: [], action: "upsert" }) });
    assert.match(wrongEnum.errors[0].message, /body.action must be one of/);

    const valid = buildRequest(op, { values, bodyText: JSON.stringify({ input: [{ company: "Acme" }] }) });
    assert.equal(valid.valid, true);
    assert.deepEqual(valid.body.value, { input: [{ company: "Acme" }] });
    assert.deepEqual(valid.headers, [
      ["X-Mkto-User-Token", "<ACCESS_TOKEN>"],
      ["Content-Type", "application/json"],
    ]);
  });

  it("validates nested $ref properties in JSON bodies", () => {
    const op = normaliseOperation(loadOpenApi3Operation("/subscriptions/{munchkinId}/persons"));
    const request = buildRequest(op, {
      values: { "path:munchkinId": "123-ABC-456" },
      bodyText: JSON.stringify({ persons: "not-an-array" }),
    });
    assert.ok(request.errors.some((error) => error.message === "body.persons must be an array."));
  });

  it("builds form-encoded fields and serialises objects as JSON", () => {
    const op = normaliseOperation(loadOperation("asset/email-templates/create-email-template"));
    const request = buildRequest(op, {
      values: {
        "form:name": "Welcome",
        "form:folder": '{"id": 12, "type": "Folder"}',
        "form:content": "<html></html>",
      },
    });
    assert.equal(request.valid, true);
    assert.equal(request.body.kind, "multipart");
    assert.deepEqual(request.body.fields, [
      { name: "name", value: "Welcome", file: false },
      { name: "folder", value: '{"id":12,"type":"Folder"}', file: false },
      { name: "content", value: "<html></html>", file: false },
    ]);
  });

  it("validates required form fields and enums", () => {
    const op = normaliseOperation(loadOperation("asset/folders/delete-folder"));
    const request = buildRequest(op, { values: { "path:id": "5", "form:type": "Campaign" } });
    assert.deepEqual(request.errors, [{ key: "form:type", message: "type must be one of: Program, Folder." }]);
  });
});

describe("code generation", () => {
  const request = () => buildRequest(getEmail(), {
    baseUrl: "https://123-ABC-456.mktorest.com",
    values: { "path:id": "1234", "query:status": "draft" },
  });

  it("generates cURL", () => {
    assert.equal(
      generateCurl(request()),
      [
        "curl --request GET \\",
        '  "https://123-ABC-456.mktorest.com/rest/asset/v1/email/1234.json?status=draft" \\',
        '  --header "Authorization: Bearer <ACCESS_TOKEN>"',
      ].join("\n"),
    );
  });

  it("generates JavaScript fetch", () => {
    assert.equal(
      generateJavaScript(request()),
      [
        "const response = await fetch(",
        '  "https://123-ABC-456.mktorest.com/rest/asset/v1/email/1234.json?status=draft",',
        "  {",
        "    headers: {",
        '      Authorization: "Bearer <ACCESS_TOKEN>"',
        "    }",
        "  }",
        ");",
        "",
        "const data = await response.json();",
      ].join("\n"),
    );
  });

  it("generates Python requests", () => {
    assert.equal(
      generatePython(request()),
      [
        "import requests",
        "",
        "response = requests.get(",
        '    "https://123-ABC-456.mktorest.com/rest/asset/v1/email/1234.json",',
        "    params={",
        '        "status": "draft",',
        "    },",
        "    headers={",
        '        "Authorization": "Bearer <ACCESS_TOKEN>",',
        "    },",
        ")",
        "",
        "data = response.json()",
      ].join("\n"),
    );
  });

  it("escapes shell metacharacters in cURL", () => {
    const op = normaliseOperation(loadOperation("data-ingestion/companies/sync-companies"));
    const built = buildRequest(op, {
      values: { "path:munchkinId": "123-ABC-456", "header:X-Request-Source": 'a"$b`' },
      bodyText: JSON.stringify({ input: [{ company: "O'Brien" }] }),
    });
    const curl = generateCurl(built);
    assert.ok(curl.includes('--header "X-Request-Source: a\\"\\$b\\`"'));
    assert.ok(curl.includes("O'\\''Brien"));
  });

  it("renders JSON bodies in each language", () => {
    const op = normaliseOperation(loadOperation("data-ingestion/companies/sync-companies"));
    const built = buildRequest(op, {
      values: { "path:munchkinId": "123-ABC-456" },
      bodyText: JSON.stringify({ input: [{ company: "Acme", active: true, parent: null }] }),
    });
    assert.ok(generateCurl(built).includes("--data '{"));
    assert.ok(generateJavaScript(built).includes("body: JSON.stringify({"));
    assert.ok(generateJavaScript(built).includes('method: "POST"'));
    const python = generatePython(built);
    assert.ok(python.includes("json={"));
    assert.ok(python.includes('"active": True,'));
    assert.ok(python.includes('"parent": None,'));
    assert.ok(!python.includes("Content-Type"), "requests sets the JSON content type itself");
  });

  it("renders form and multipart bodies", () => {
    const form = buildRequest(normaliseOperation(loadOperation("asset/folders/delete-folder")), {
      values: { "path:id": "5", "form:type": "Folder" },
    });
    assert.ok(generateCurl(form).includes('--data-urlencode "type=Folder"'));
    assert.ok(generateJavaScript(form).includes("body: new URLSearchParams({"));
    assert.ok(generatePython(form).includes('data={\n        "type": "Folder",'));

    const multipart = buildRequest(normaliseOperation(loadOperation("core/bulk-import-program-members/import-program-members")), {
      values: { "path:programId": "1001", "query:programMemberStatus": "Registered", "query:format": "CSV", "form:file": "<FILE_PATH>" },
    });
    assert.ok(generateCurl(multipart).includes('--form "file=@<FILE_PATH>"'));
    assert.ok(generateJavaScript(multipart).includes('formData.append("file", file);'));
    assert.ok(generatePython(multipart).includes('"file": open("<FILE_PATH>", "rb"),'));
  });
});
