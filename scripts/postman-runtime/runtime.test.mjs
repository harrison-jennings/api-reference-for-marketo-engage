/**
 * Postman runtime regression tests.
 *
 * The collection relies on how Postman itself sends requests: path variables
 * followed by ".json", query serialisation, GET bodies, inherited and
 * request-level authorisation, form encoding and the Identity script. These
 * tests send requests from the committed collection with Postman's request
 * engine (postman-runtime, pinned in package-lock.json) to a server on
 * 127.0.0.1, and check what arrives. Nothing is sent anywhere else.
 *
 * Run with `make postman-runtime-test`, which installs the pinned packages.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, describe, it } from "node:test";

import sdk from "postman-collection";
import runtime from "postman-runtime";

import { stableId } from "../postman/collection.mjs";
import { collection, environment, manifest } from "../tests/postman-helpers.mjs";

const TOKEN = "runtime-test-token";
const MUNCHKIN = "TEST-MUNCHKIN";
let server;
let baseUrl;
let received = [];

before(async () => {
  server = http.createServer((request, response) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      received.push({ method: request.method, url: request.url, headers: request.headers, body: Buffer.concat(chunks).toString("utf8") });
      response.setHeader("content-type", "application/json");
      response.end(request.url.startsWith("/identity/oauth/token")
        ? JSON.stringify({ access_token: TOKEN, token_type: "bearer", expires_in: 3599, scope: "test" })
        : JSON.stringify({ success: true, result: [] }));
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

/** All request items in collection order, with their manifest entries. */
function requestItems(root = collection) {
  const entries = new Map(manifest.operations.map((entry) => [stableId("request", entry.section, entry.method, entry.path), entry]));
  const items = [];
  const visit = (node) => (node.item || []).forEach((child) => (child.request ? items.push({ item: child, entry: entries.get(child.id) }) : visit(child)));
  visit(root);
  return items;
}

function itemFor(method, path) {
  const found = requestItems().find(({ entry }) => entry.method === method && entry.path === path);
  assert.ok(found, `${method} ${path} is not in the collection`);
  return structuredClone(found.item);
}

/** The environment template, pointed at the local server. */
function testEnvironment(overrides = {}) {
  const values = {
    marketoBaseUrl: baseUrl,
    ingestionBaseUrl: baseUrl,
    munchkinId: MUNCHKIN,
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    accessToken: TOKEN,
    ...overrides,
  };
  return new sdk.VariableScope({
    name: "Runtime test",
    values: environment.values.map((variable) => ({ ...variable, value: variable.key in values ? values[variable.key] : variable.value })),
  });
}

/** Send items with Postman's runtime, keeping the collection's own authorisation. */
async function send(items, { environment: scope = testEnvironment() } = {}) {
  received = [];
  const consoles = [];
  const exceptions = [];
  const run = new sdk.Collection({ info: { name: collection.info.name }, auth: collection.auth, item: items });
  await new Promise((resolve, reject) => {
    new runtime.Runner().run(run, { environment: scope, fileResolver: fs }, (error, runner) => {
      if (error) return reject(error);
      runner.start({
        console: (cursor, level, ...messages) => consoles.push({ level, message: messages.join(" ") }),
        exception: (cursor, problem) => exceptions.push(problem.message),
        done: (problem) => (problem ? reject(problem) : resolve()),
      });
    });
  });
  assert.deepEqual(exceptions, []);
  return { received: received.slice(), consoles, environment: scope };
}

function queryOf(url) {
  return url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
}

describe("Postman runtime: every request", () => {
  it("is sent to the right host with the documented authentication and no token in the URL", async () => {
    const items = requestItems();
    const { received: sent } = await send(items.map(({ item }) => item));
    assert.equal(sent.length, items.length);
    sent.forEach((request, index) => {
      const { entry } = items[index];
      const label = `${entry.method} ${entry.path}`;
      assert.equal(request.method, entry.method, label);
      assert.ok(!/access_token=/.test(request.url), `${label}: access_token in the URL`);
      if (entry.section === "identity") {
        assert.equal(request.headers.authorization, undefined, label);
        assert.match(request.url, /client_id=test-client-id&client_secret=test-client-secret&grant_type=client_credentials/, label);
      } else if (entry.section === "data-ingestion") {
        assert.equal(request.headers.authorization, undefined, label);
        assert.equal(request.headers["x-mkto-user-token"], TOKEN, label);
      } else {
        assert.equal(request.headers.authorization, `Bearer ${TOKEN}`, label);
        assert.equal(request.headers["x-mkto-user-token"], undefined, label);
      }
    });
  });

  it("substitutes every path variable, including those followed by .json", async () => {
    const items = requestItems().map(({ item, entry }) => {
      const copy = structuredClone(item);
      for (const variable of copy.request.url.variable || []) {
        if (!variable.value) variable.value = `pv-${variable.key}`;
      }
      return { item: copy, entry };
    });
    const { received: sent } = await send(items.map(({ item }) => item));
    sent.forEach((request, index) => {
      const { entry } = items[index];
      const expected = entry.path.replace(/\{([^}]+)\}/g, (match, name) => (name === "munchkinId" ? MUNCHKIN : `pv-${name}`));
      assert.equal(request.url.split("?")[0], expected, `${entry.method} ${entry.path}`);
    });
    assert.ok(sent.some((request) => request.url.startsWith("/rest/asset/v1/email/pv-id.json")));
  });
});

describe("Postman runtime: query parameters", () => {
  it("sends comma-separated lists unchanged and leaves disabled parameters out", async () => {
    const item = itemFor("GET", "/rest/v1/activities.json");
    const query = Object.fromEntries(item.request.url.query.map((row) => [row.key, row]));
    query.nextPageToken.value = "token-value";
    query.activityTypeIds.value = "1,6,12";
    const { received: [request] } = await send([item]);
    assert.equal(queryOf(request.url), "nextPageToken=token-value&activityTypeIds=1,6,12");
  });

  it("sends required parameters even when empty, and enabled optional ones", async () => {
    const item = itemFor("GET", "/rest/v1/activities.json");
    const leadIds = item.request.url.query.find((row) => row.key === "leadIds");
    delete leadIds.disabled;
    leadIds.value = "1,2";
    const { received: [request] } = await send([item]);
    assert.equal(queryOf(request.url), "nextPageToken=&activityTypeIds=&leadIds=1,2");
  });

  it("sends repeated rows as repeated keys", async () => {
    const item = itemFor("GET", "/rest/asset/v2/email/filter");
    const status = item.request.url.query.find((row) => row.key === "status");
    delete status.disabled;
    status.value = "approved";
    item.request.url.query.push({ ...status, value: "draft" });
    const { received: [request] } = await send([item]);
    assert.deepEqual(new URLSearchParams(queryOf(request.url)).getAll("status"), ["approved", "draft"]);
  });

  it("encodes spaces, ampersands and non-ASCII characters so values arrive intact", async () => {
    const item = itemFor("GET", "/rest/v1/activities.json");
    const value = "a b&c=d/é";
    item.request.url.query.find((row) => row.key === "nextPageToken").value = value;
    const { received: [request] } = await send([item]);
    assert.equal(new URLSearchParams(queryOf(request.url)).get("nextPageToken"), value);
  });

  it("sends + unchanged, so a literal + must be entered as %2B (as the collection description says)", async () => {
    const item = itemFor("GET", "/rest/v1/activities/pagingtoken.json");
    const since = item.request.url.query.find((row) => row.key === "sinceDatetime");
    since.value = "2026-10-01T00:00:00+10:00";
    let { received: [request] } = await send([item]);
    assert.equal(new URLSearchParams(queryOf(request.url)).get("sinceDatetime"), "2026-10-01T00:00:00 10:00");
    since.value = "2026-10-01T00:00:00%2B10:00";
    ({ received: [request] } = await send([item]));
    assert.equal(new URLSearchParams(queryOf(request.url)).get("sinceDatetime"), "2026-10-01T00:00:00+10:00");
    assert.match(collection.info.description, /Enter a literal plus sign as `%2B`/);
  });
});

describe("Postman runtime: bodies", () => {
  const customObjects = ["GET", "/rest/v1/customobjects/{customObjectName}.json"];

  it("sends no body on a GET request whose optional body is left empty", async () => {
    const { received: [request] } = await send([itemFor(...customObjects)]);
    assert.equal(request.body, "");
    assert.equal(request.headers["content-type"], undefined);
  });

  it("sends a body that the user adds to a GET request", async () => {
    const item = itemFor(...customObjects);
    item.request.body.raw = '{"input":[]}';
    const { received: [request] } = await send([item]);
    assert.equal(request.body, '{"input":[]}');
    assert.equal(request.headers["content-type"], "application/json");
  });

  it("would drop that body without the request's body-pruning setting", async () => {
    const item = itemFor(...customObjects);
    item.request.body.raw = '{"input":[]}';
    delete item.protocolProfileBehavior;
    const { received: [request] } = await send([item]);
    assert.equal(request.body, "");
  });

  it("sends JSON bodies with a single application/json Content-Type", async () => {
    const item = itemFor("POST", "/rest/v1/leads.json");
    const { received: [request] } = await send([item]);
    assert.equal(request.headers["content-type"], "application/json");
    assert.deepEqual(JSON.parse(request.body), JSON.parse(item.request.body.raw));
  });

  it("form-encodes x-www-form-urlencoded fields, including JSON-valued ones", async () => {
    const item = itemFor("POST", "/rest/asset/v1/email/{id}/content.json");
    const value = '{"type":"Text","value":"A & B = C"}';
    const field = item.request.body.urlencoded.find((row) => row.key === "fromName");
    delete field.disabled;
    field.value = value;
    const { received: [request] } = await send([item]);
    assert.match(request.headers["content-type"], /^application\/x-www-form-urlencoded/);
    assert.deepEqual(Object.fromEntries(new URLSearchParams(request.body)), { fromName: value });
  });

  it("uploads a selected file as multipart form data", async () => {
    const file = join(fs.mkdtempSync(join(tmpdir(), "postman-runtime-")), "sample.txt");
    fs.writeFileSync(file, "file content");
    const item = itemFor("POST", "/rest/asset/v1/files.json");
    item.request.body.formdata.find((row) => row.key === "file").src = file;
    item.request.body.formdata.find((row) => row.key === "name").value = "sample.txt";
    const { received: [request] } = await send([item]);
    assert.match(request.headers["content-type"], /^multipart\/form-data; boundary=/);
    assert.match(request.body, /name="file"; filename="sample\.txt"\r\nContent-Type: text\/plain\r\n\r\nfile content\r\n/);
    assert.match(request.body, /name="name"\r\n\r\nsample\.txt\r\n/);
    assert.ok(!/name="description"/.test(request.body), "disabled form fields must not be sent");
    fs.rmSync(file);
  });
});

describe("Postman runtime: Identity script", () => {
  const identity = ["GET", "/identity/oauth/token"];

  it("saves the token and its expiry to the selected environment, and sends nothing else", async () => {
    const scope = testEnvironment({ accessToken: "" });
    const startedAt = Date.now();
    const { received: sent, consoles } = await send([itemFor(...identity)], { environment: scope });
    assert.equal(sent.length, 1);
    const values = scope.toObject();
    assert.equal(values.accessToken, TOKEN);
    const expiresAt = Number(values.accessTokenExpiresAt);
    assert.ok(expiresAt >= startedAt + 3599 * 1000 && expiresAt <= Date.now() + 3599 * 1000);
    assert.equal(consoles.length, 1);
    assert.match(consoles[0].message, /^Access token saved to the Runtime test environment\./);
    assert.ok(!consoles[0].message.includes(TOKEN));
  });

  it("saves nothing when no environment is selected", async () => {
    const scope = new sdk.VariableScope({ values: [{ key: "marketoBaseUrl", value: baseUrl }] });
    const { received: sent, consoles } = await send([itemFor(...identity)], { environment: scope });
    assert.equal(sent.length, 1);
    assert.equal(scope.get("accessToken"), undefined);
    assert.deepEqual(consoles, [{ level: "warn", message: "Access token not saved: select an environment, then send this request again." }]);
  });
});
