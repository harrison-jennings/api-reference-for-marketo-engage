/**
 * Authentication: native Postman authorisation on every request, and the
 * Identity post-response handler run against a mocked Postman runtime.
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import vm from "node:vm";

import { normaliseOperation } from "../../docs-site/docs/assets/request-builder/operation.js";
import { stableId } from "../postman/collection.mjs";
import { EXPIRY_VARIABLE, TOKEN_VARIABLE, identityTokenScriptLines } from "../postman/identity-script.mjs";
import { collection, itemsByOperation, manifest, readJson } from "./postman-helpers.mjs";

const itemFor = itemsByOperation(stableId);
const operations = manifest.operations.map((entry) => ({ entry, op: normaliseOperation(readJson("reference", entry.json)), ...itemFor(entry) }));

/** The authorisation Postman applies: the nearest auth on the item, its folders, then the collection. */
function effectiveAuth(item, folders) {
  return item.request.auth || [...folders].reverse().find((folder) => folder.auth)?.auth || collection.auth;
}

function apikey(auth, key) {
  return auth.apikey.find((attribute) => attribute.key === key)?.value;
}

describe("request authorisation", () => {
  it("uses a bearer token from {{accessToken}} by default", () => {
    assert.deepEqual(collection.auth, { type: "bearer", bearer: [{ key: "token", value: "{{accessToken}}", type: "string" }] });
  });

  it("applies the documented scheme to every request, with no conflicting headers", () => {
    for (const { entry, op, item, folders } of operations) {
      const auth = effectiveAuth(item, folders);
      const headers = item.request.header.map((header) => header.key.toLowerCase());
      assert.ok(!headers.includes("authorization"), `${entry.json}: Authorization header row`);
      assert.ok(!headers.includes("x-mkto-user-token"), `${entry.json}: X-Mkto-User-Token header row`);
      assert.ok(!/access_token=/.test(item.request.url.raw), `${entry.json}: access_token in the URL`);
      if (op.authentication.type === "client-credentials") {
        assert.deepEqual(item.request.auth, { type: "noauth" }, `${entry.json}: Identity requests must not inherit bearer auth`);
      } else if (op.authentication.type === "header") {
        assert.equal(auth.type, "apikey", entry.json);
        assert.equal(apikey(auth, "key"), op.authentication.header[0], entry.json);
        assert.equal(apikey(auth, "value"), "{{accessToken}}", entry.json);
        assert.equal(apikey(auth, "in"), "header", entry.json);
      } else {
        assert.equal(item.request.auth, undefined, `${entry.json}: should inherit the collection's bearer auth`);
        assert.equal(auth.type, "bearer", entry.json);
      }
    }
  });

  it("sends Identity credentials exactly as documented", () => {
    const identity = operations.filter(({ op }) => op.authentication.type === "client-credentials");
    assert.deepEqual(identity.map(({ entry }) => entry.method).sort(), ["GET", "POST"]);
    for (const { entry, item } of identity) {
      const query = Object.fromEntries(item.request.url.query.map((row) => [row.key, row]));
      assert.equal(query.client_id.value, "{{clientId}}", entry.json);
      assert.equal(query.client_secret.value, "{{clientSecret}}", entry.json);
      assert.equal(query.grant_type.value, "client_credentials", entry.json);
      for (const row of Object.values(query)) assert.ok(!row.disabled, `${entry.json}: ${row.key} disabled`);
      assert.equal(item.request.url.host[0], "{{marketoBaseUrl}}");
      assert.deepEqual(item.request.url.path, ["identity", "oauth", "token"]);
      assert.match(item.request.description, /query string/);
      assert.match(item.request.description, /Postman Vault/);
    }
  });

  it("sends Data Ingestion requests to their own host with the token header", () => {
    const ingestion = operations.filter(({ entry }) => entry.section === "data-ingestion");
    assert.ok(ingestion.length > 0);
    for (const { entry, item } of ingestion) {
      assert.equal(item.request.url.host[0], "{{ingestionBaseUrl}}", entry.json);
      const munchkin = item.request.url.variable.find((variable) => variable.key === "munchkinId");
      assert.equal(munchkin.value, "{{munchkinId}}", entry.json);
      for (const name of ["X-Correlation-Id", "X-Request-Source"]) {
        const header = item.request.header.find((row) => row.key === name);
        assert.ok(header?.disabled, `${entry.json}: ${name} should be present and disabled`);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// The Identity post-response handler in a mocked Postman runtime
// ---------------------------------------------------------------------------

const NOW = 1_800_000_000_000;
const SECRET_TOKEN = "token-value-that-must-never-be-logged";
const SECRET_CLIENT = "client-secret-that-must-never-be-logged";

/**
 * Run the script with a fake `pm`. Network and sequencing primitives are
 * traps that record any call, so tests can assert that none happen.
 */
function runScript({ code = 200, body, json, environmentName = "Sandbox", setThrows = false, initial = {} } = {}) {
  const values = new Map(Object.entries(initial));
  const writes = [];
  const logs = [];
  const forbidden = [];
  const trap = (name) => (...args) => {
    forbidden.push(name);
    return undefined;
  };
  const pm = {
    response: {
      code,
      json: json || (() => (typeof body === "string" ? JSON.parse(body) : body)),
      text: () => (typeof body === "string" ? body : JSON.stringify(body)),
    },
    request: { url: { toString: () => `https://example.invalid/identity/oauth/token?client_secret=${SECRET_CLIENT}` } },
    environment: {
      name: environmentName,
      get: (key) => values.get(key),
      set: (key, value) => {
        if (setThrows) throw new Error("read-only environment");
        writes.push([key, value]);
        values.set(key, value);
      },
      unset: trap("pm.environment.unset"),
    },
    variables: { set: trap("pm.variables.set"), get: () => undefined },
    collectionVariables: { set: trap("pm.collectionVariables.set"), get: () => undefined },
    globals: { set: trap("pm.globals.set"), get: () => undefined },
    sendRequest: trap("pm.sendRequest"),
    execution: { runRequest: trap("pm.execution.runRequest"), setNextRequest: trap("pm.execution.setNextRequest"), skipRequest: trap("pm.execution.skipRequest") },
    setNextRequest: trap("postman.setNextRequest"),
  };
  const record = (level) => (...args) => logs.push([level, args.join(" ")]);
  const context = vm.createContext({
    pm,
    console: { log: record("log"), info: record("info"), warn: record("warn"), error: record("error") },
    fetch: trap("fetch"),
    XMLHttpRequest: trap("XMLHttpRequest"),
    setTimeout: trap("setTimeout"),
    setInterval: trap("setInterval"),
    require: trap("require"),
    postman: { setNextRequest: trap("postman.setNextRequest"), setEnvironmentVariable: trap("postman.setEnvironmentVariable") },
  });
  vm.runInContext(`Date.now = () => ${NOW};`, context);
  vm.runInContext(identityTokenScriptLines().join("\n"), context, { timeout: 1000 });
  return { values, writes, logs, forbidden };
}

function assertNoLeaks(result) {
  for (const [, message] of result.logs) {
    assert.ok(!message.includes(SECRET_TOKEN), `logged the token: ${message}`);
    assert.ok(!message.includes(SECRET_CLIENT), `logged the client secret: ${message}`);
    assert.ok(!/https?:\/\//.test(message), `logged a URL: ${message}`);
  }
  assert.deepEqual(result.forbidden, []);
}

const VALID = { access_token: SECRET_TOKEN, token_type: "bearer", expires_in: 3599, scope: "api-user@example.invalid" };

describe("Identity post-response handler", () => {
  it("saves only the access token and its expiry in epoch milliseconds", () => {
    const result = runScript({ body: VALID });
    assert.deepEqual(result.writes, [[TOKEN_VARIABLE, SECRET_TOKEN], [EXPIRY_VARIABLE, String(NOW + 3599 * 1000)]]);
    assert.equal(result.logs.length, 1);
    assert.match(result.logs[0][1], /Access token saved to the Sandbox environment\. It expires at 2027-01-15T08:59:59\.000Z\./);
    assertNoLeaks(result);
  });

  const rejected = {
    "an error status": { code: 401, body: VALID },
    "a server error": { code: 500, body: { message: "error" } },
    "a body that is not JSON": { body: "<html>error</html>" },
    "a JSON body that is not an object": { body: "null" },
    "success: false": { body: { success: false, errors: [{ code: "601", message: "Access token invalid" }] } },
    "a missing access_token": { body: { expires_in: 3599 } },
    "an empty access_token": { body: { ...VALID, access_token: "" } },
    "a non-string access_token": { body: { ...VALID, access_token: 12345 } },
    "a missing expires_in": { body: { access_token: SECRET_TOKEN } },
    "a string expires_in": { body: { ...VALID, expires_in: "3599" } },
    "a zero expires_in": { body: { ...VALID, expires_in: 0 } },
    "a negative expires_in": { body: { ...VALID, expires_in: -1 } },
    "an infinite expires_in": { json: () => ({ ...VALID, expires_in: Infinity }) },
    "a NaN expires_in": { json: () => ({ ...VALID, expires_in: Number.NaN }) },
    "no selected environment": { body: VALID, environmentName: null },
  };
  for (const [name, options] of Object.entries(rejected)) {
    it(`keeps the stored values for ${name}`, () => {
      const initial = { [TOKEN_VARIABLE]: "previous-token", [EXPIRY_VARIABLE]: "1700000000000" };
      const result = runScript({ ...options, initial });
      assert.deepEqual(result.writes, []);
      assert.equal(result.values.get(TOKEN_VARIABLE), "previous-token");
      assert.equal(result.values.get(EXPIRY_VARIABLE), "1700000000000");
      assert.equal(result.logs.length, 1);
      assert.equal(result.logs[0][0], "warn");
      assert.match(result.logs[0][1], /^Access token not saved: /);
      assertNoLeaks(result);
    });
  }

  it("reports, without throwing, when the environment cannot be updated", () => {
    const result = runScript({ body: VALID, setThrows: true });
    assert.deepEqual(result.logs, [["warn", "Access token not saved: the environment could not be updated."]]);
    assertNoLeaks(result);
  });
});
