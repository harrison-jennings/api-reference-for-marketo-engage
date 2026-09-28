/**
 * Sweep every generated operation through the generic engine. This does not
 * assert endpoint-specific behaviour; it guards the invariants that must hold
 * across the whole library: every operation loads, mocks, and produces code
 * samples, and credentials only ever appear as placeholders.
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { PLACEHOLDERS, normaliseOperation } from "../docs/assets/request-builder/operation.js";
import { buildRequest } from "../docs/assets/request-builder/request.js";
import { controlFor } from "../docs/assets/request-builder/validate.js";
import { GENERATORS } from "../docs/assets/request-builder/codegen.js";
import { generateMock, generateResponseMock } from "../docs/assets/request-builder/mock.js";
import { generateRealisticResponse } from "../docs/assets/request-builder/behaviour.js";
import { allOperationFiles, readJson } from "./helpers.js";

const files = allOperationFiles();
const manifest = readJson("reference", "manifest.json");
const SECRET_PLACEHOLDERS = [PLACEHOLDERS.accessToken, PLACEHOLDERS.clientId, PLACEHOLDERS.clientSecret];

/** Fill every non-credential field with a mock value. */
function filledState(op) {
  const values = {};
  for (const field of [...op.fields, ...(op.body?.fields || [])]) {
    if (field.credential) continue;
    const control = controlFor(field);
    const value = generateMock(field.schema, op.resolver, { name: field.name });
    if (control === "list") values[field.key] = (Array.isArray(value) ? value : [value]).join("\n");
    else if (control === "json") values[field.key] = JSON.stringify(value);
    else if (control === "file") values[field.key] = PLACEHOLDERS.filePath;
    else values[field.key] = String(value);
  }
  const bodyValue = op.body?.kind === "json"
    ? op.body.example ?? generateMock(op.body.schema, op.resolver)
    : undefined;
  return { baseUrl: "https://123-ABC-456.mktorest.com", values, bodyText: bodyValue === undefined ? undefined : JSON.stringify(bodyValue) };
}

function checkOperation(file) {
  const entry = manifest.operations.find((candidate) => candidate.json === file);
  const op = normaliseOperation(readJson("reference", file));
  assert.equal(op.method, entry.method);
  assert.equal(op.path, entry.path);
  assert.equal(op.operationId, entry.operationId);

  for (const response of op.responses) generateResponseMock(op, response.code);

  const request = buildRequest(op, filledState(op));
  for (const response of op.responses) {
    const realistic = generateRealisticResponse(op, response.code, request);
    // Successful record reads never carry failure reasons.
    for (const record of Array.isArray(realistic.body?.result) && /^2/.test(response.code) ? realistic.body.result : []) {
      assert.ok(!(record && typeof record === "object" && ("reasons" in record || "reason" in record)), `${response.code} record has reasons`);
    }
  }
  assert.ok(!request.url.includes("{"), `unsubstituted path in ${request.url}`);

  for (const generator of GENERATORS) {
    const code = generator.generate(request);
    assert.ok(code.length > 0);
    // Credential-shaped values must be placeholders.
    for (const match of code.matchAll(/(access_token|client_secret|client_id|X-Mkto-User-Token|Bearer)["=: ]+([^"&\s,]+)/gi)) {
      assert.ok(SECRET_PLACEHOLDERS.includes(match[2]), `${generator.id}: ${match[0]}`);
    }
  }
  // A bearer token is never repeated in the URL.
  if (op.authentication.type !== "client-credentials") assert.ok(!/access_token=/.test(request.url));
}

describe("all generated operations", () => {
  it("matches the manifest", () => {
    assert.equal(files.length, manifest.summary.operations);
    assert.deepEqual(files, manifest.operations.map((entry) => entry.json).sort());
  });

  it("normalise, mock and generate code with placeholder credentials only", () => {
    const failures = [];
    for (const file of files) {
      try {
        checkOperation(file);
      } catch (error) {
        failures.push(`${file}: ${error.message}`);
      }
    }
    assert.deepEqual(failures, []);
  });
});
