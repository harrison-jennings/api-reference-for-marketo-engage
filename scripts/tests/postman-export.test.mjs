/**
 * Format, coverage and fidelity of the exported collection: it is valid
 * Postman Collection v2.1, has exactly one request per manifest operation, and
 * represents every documented input, property and response.
 */

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { describe, it } from "node:test";

import { createResolver, isPlainObject, isResponseModel } from "../../docs-site/docs/assets/request-builder/schema.js";
import { normaliseOperation } from "../../docs-site/docs/assets/request-builder/operation.js";
import { COLLECTION_NAME, COLLECTION_SCHEMA, FAMILIES, NOT_DOCUMENTED, OFFSET_PAGING, plainText, sentence, stableId } from "../postman/collection.mjs";
import { code, htmlToMarkdown, inlineMarkdown, visibleWords } from "../postman/markdown.mjs";
import { createValidator } from "../postman/schema-validator.mjs";
import {
  collection,
  deref,
  folders,
  itemsByOperation,
  manifest,
  pointerToken,
  propertyLine,
  readJson,
  readText,
  requestItems,
  sourceOperation,
  sourceParameters,
} from "./postman-helpers.mjs";

const SCHEMA_SHA256 = "90000a561d00b1a06ee37a6d3606e911e1357f757d8d91afc690d87dadacb9b2";
const itemFor = itemsByOperation(stableId);
const operations = manifest.operations.map((entry) => ({ entry, document: readJson("reference", entry.json) }));

/** Collect failures across every operation and report them together. */
function sweep(check) {
  const failures = [];
  for (const { entry, document } of operations) {
    const found = itemFor(entry);
    if (!found) {
      failures.push(`${entry.json}: no request item`);
      continue;
    }
    check({ entry, document, item: found.item, folders: found.folders, fail: (message) => failures.push(`${entry.json}${message}`) });
  }
  assert.deepEqual(failures, []);
}

/** The text a native row description starts with for a source description. */
function rowText(description) {
  return sentence(plainText(inlineMarkdown(description) || NOT_DOCUMENTED));
}

describe("collection format", () => {
  it("uses the pinned Postman Collection v2.1.0 schema", () => {
    const text = readText("scripts", "postman", "collection-v2.1.0.schema.json");
    assert.equal(createHash("sha256").update(text).digest("hex"), SCHEMA_SHA256);
    assert.equal(JSON.parse(text).id, "https://schema.getpostman.com/json/collection/v2.1.0/");
    assert.equal(collection.info.schema, COLLECTION_SCHEMA);
  });

  it("is valid against the schema", () => {
    const validate = createValidator(readJson("scripts", "postman", "collection-v2.1.0.schema.json"));
    assert.deepEqual(validate(collection), []);
  });

  it("the schema validator rejects invalid collections", () => {
    const validate = createValidator(readJson("scripts", "postman", "collection-v2.1.0.schema.json"));
    const broken = structuredClone(collection);
    delete broken.info.name;
    assert.ok(validate(broken).length > 0);
    const badMode = structuredClone(collection);
    requestItems(badMode).find(({ item }) => item.request.body).item.request.body.mode = "nonsense";
    assert.ok(validate(badMode).length > 0);
    const badAuth = structuredClone(collection);
    badAuth.auth = { type: "nonsense" };
    assert.ok(validate(badAuth).length > 0);
  });

  it("has a clear unofficial name, attribution and licence notice", () => {
    assert.equal(collection.info.name, COLLECTION_NAME);
    assert.match(collection.info.name, /Unofficial/);
    assert.match(collection.info.description, /NOT AUTHORIZED, ENDORSED OR SPONSORED BY ADOBE, PUBLISHER OF ADOBE MARKETO ENGAGE/);
    assert.match(collection.info.description, /Apache License 2\.0/);
    assert.match(collection.info.description, /AdobeDocs\/marketo-apis/);
    assert.match(collection.info.description, /Collection Runner/);
  });
});

describe("operation coverage", () => {
  it("has exactly one request per manifest operation and nothing else", () => {
    const items = requestItems();
    assert.equal(items.length, manifest.operations.length);
    assert.equal(manifest.summary.operations, manifest.operations.length);
    const expected = manifest.operations.map((entry) => stableId("request", entry.section, entry.method, entry.path)).sort();
    assert.deepEqual(items.map(({ item }) => item.id).sort(), expected);
    assert.equal(new Set(items.map(({ item }) => item.id)).size, items.length);
  });

  it("groups requests by API family, then by endpoint group, with unique names", () => {
    const familyTitles = new Map(FAMILIES.map((family) => [family.section, family.title]));
    sweep(({ entry, item, folders: trail, fail }) => {
      if (trail.length !== 2) fail(`: expected 2 folder levels, found ${trail.length}`);
      if (familyTitles.has(entry.section) && trail[0].name !== familyTitles.get(entry.section)) fail(`: in ${trail[0].name}`);
      if (trail[1].name !== entry.tag) fail(`: in group ${trail[1].name}, expected ${entry.tag}`);
      if (!item.name.startsWith(`${entry.method} · ${entry.title}`)) fail(`: named ${item.name}`);
      if (item.request.method !== entry.method) fail(`: method ${item.request.method}`);
    });
    for (const folder of folders()) {
      const names = folder.item.filter((child) => child.request).map((child) => child.name);
      assert.equal(new Set(names).size, names.length, `duplicate request names in ${folder.name}`);
    }
    const order = collection.item.map((family) => family.name);
    assert.deepEqual(order.slice(0, FAMILIES.length), FAMILIES.filter((family) => order.includes(family.title)).map((family) => family.title));
  });

  it("describes each family and group folder", () => {
    for (const family of collection.item) {
      assert.match(family.description, /Base URL/);
      assert.match(family.description, /Requests run only when you send them/);
      for (const group of family.item) assert.match(group.description, /Reference: \[/);
    }
  });

  it("links every request to its page on the documentation site", () => {
    sweep(({ entry, item, fail }) => {
      const page = `https://mkto-ref.harrisonjennings.au/reference/${entry.markdown.replace(/\.md$/, "")}/`;
      if (!item.request.description.includes(`](${page})`)) fail(`: no link to ${page}`);
    });
  });
});

describe("request URLs", () => {
  it("map every path to the right host and native path variables, including .json suffixes", () => {
    sweep(({ entry, item, fail }) => {
      const url = item.request.url;
      const expectedHost = entry.section === "data-ingestion" ? "{{ingestionBaseUrl}}" : "{{marketoBaseUrl}}";
      if (url.host.join("") !== expectedHost) fail(`: host ${url.host.join("")}`);
      const expectedPath = entry.path.split("/").filter(Boolean).map((segment) => segment.replace(/^\{([^}]+)\}/, ":$1"));
      assert.deepEqual(url.path, expectedPath, entry.json);
      const raw = url.raw.split("?")[0];
      if (raw !== `${expectedHost}/${expectedPath.join("/")}`) fail(`: raw URL ${url.raw}`);
      const names = [...entry.path.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);
      assert.deepEqual((url.variable || []).map((variable) => variable.key).sort(), names.sort(), entry.json);
    });
  });

  it("only puts enabled query parameters in the raw URL", () => {
    sweep(({ item, fail }) => {
      const enabled = (item.request.url.query || []).filter((row) => !row.disabled).map((row) => row.key);
      const raw = item.request.url.raw.includes("?") ? item.request.url.raw.split("?")[1].split("&").map((pair) => decodeURIComponent(pair.split("=")[0])) : [];
      if (JSON.stringify(raw) !== JSON.stringify(enabled)) fail(`: raw query ${raw} but enabled rows ${enabled}`);
    });
  });
});

describe("input parity with the source specifications", () => {
  it("represents every path, query, header and form parameter with its requiredness and description", () => {
    sweep(({ entry, document, item, fail }) => {
      const request = item.request;
      for (const { parameter, pointer } of sourceParameters(document, entry)) {
        const at = `${pointer} (${parameter.in} ${parameter.name})`;
        const description = rowText(parameter.description);
        const required = parameter.in === "path" || Boolean(parameter.required);
        let row;
        if (parameter.in === "path") {
          row = request.url.variable?.find((variable) => variable.key === parameter.name);
        } else if (parameter.in === "query" && parameter.name === "access_token") {
          if (request.url.query?.some((query) => query.key === "access_token")) fail(`${at}: access_token must not be sent in the query string`);
          if (!request.description.includes("`access_token` · not sent")) fail(`${at}: not documented`);
          continue;
        } else if (parameter.in === "query") {
          row = request.url.query?.find((query) => query.key === parameter.name);
        } else if (parameter.in === "header" && /^x-mkto-user-token$/i.test(parameter.name)) {
          const key = request.auth?.apikey?.find((attribute) => attribute.key === "key")?.value;
          if (key !== parameter.name) fail(`${at}: not set by API Key authorisation`);
          if (!request.description.includes(inlineMarkdown(parameter.description))) fail(`${at}: description missing`);
          continue;
        } else if (parameter.in === "header") {
          row = request.header.find((header) => header.key === parameter.name);
        } else if (parameter.in === "formData") {
          row = (request.body?.urlencoded || request.body?.formdata || []).find((field) => field.key === parameter.name);
          if (row && (parameter.type === "file") !== (row.type === "file")) fail(`${at}: file type mismatch`);
        } else if (parameter.in === "body") {
          continue; // Checked with the body schema below.
        } else {
          fail(`${at}: unsupported parameter location`);
          continue;
        }
        if (!row) {
          fail(`${at}: missing from the request`);
          continue;
        }
        // Marketo's `id` query list is an alternative to the JSON body (see operation.js), so it is required only without a body.
        const alternative = parameter.in === "query" && normaliseOperation(document).body?.alternativeTo === `query:${parameter.name}`;
        if (alternative) {
          if (!row.description?.includes("Required unless you send a request body")) fail(`${at}: alternative to the body not described`);
        } else {
          if (parameter.in !== "path" && Boolean(row.disabled) === required) fail(`${at}: ${required ? "required but disabled" : "optional but enabled"}`);
          if (!row.description?.includes(required ? "Required" : "Optional")) fail(`${at}: requiredness not described`);
        }
        if (!row.description?.startsWith(description)) fail(`${at}: description does not start with the source description`);
        const schema = parameter.schema || parameter;
        for (const value of schema.enum || schema.items?.enum || []) {
          if (!row.description.includes(plainText(code(value)))) fail(`${at}: allowed value ${value} not described`);
        }
        if (schema.default !== undefined && !row.description.includes("Default:")) fail(`${at}: default not described`);
      }
    });
  });

  it("documents every request-body property, including nested ones", () => {
    sweep(({ entry, document, item, fail }) => {
      const { operation, pointer } = sourceOperation(document, entry);
      const resolver = createResolver(document);
      const description = item.request.description;
      const bodyParameter = sourceParameters(document, entry).find(({ parameter }) => parameter.in === "body");
      let schema;
      let schemaPointer;
      if (bodyParameter) {
        schema = bodyParameter.parameter.schema;
        schemaPointer = `${bodyParameter.pointer}/schema`;
      } else if (operation.requestBody) {
        const content = deref(document, operation.requestBody, `${pointer}/requestBody`).node.content || {};
        const type = Object.keys(content).find((name) => /json/i.test(name)) || Object.keys(content)[0];
        schema = content[type]?.schema;
        schemaPointer = `${pointer}/requestBody/content/${pointerToken(type)}/schema`;
      }
      if (!schema) {
        if (item.request.body && !sourceParameters(document, entry).some(({ parameter }) => parameter.in === "formData")) fail(": has a body, but the source declares none");
        return;
      }
      if (!item.request.body) fail(`${schemaPointer}: source declares a body, but the request has none`);
      const form = Boolean(item.request.body?.urlencoded || item.request.body?.formdata);
      walkProperties(document, resolver, schema, schemaPointer, "", new Set(), (property) => {
        const at = `${property.pointer} (${property.path})`;
        if (form && !property.path.includes(".") && !property.path.includes("[")) {
          const row = (item.request.body.urlencoded || item.request.body.formdata).find((field) => field.key === property.path);
          if (!row) return fail(`${at}: no form row`);
          if (Boolean(row.disabled) === property.required) fail(`${at}: form row requiredness`);
          if (!row.description.startsWith(rowText(property.description))) fail(`${at}: form row description`);
          return;
        }
        const line = propertyLine(description, property.path);
        if (!line) return fail(`${at}: not documented in the request description`);
        if (!line.includes(property.required ? " · required" : " · optional")) fail(`${at}: requiredness not described`);
        if (!line.includes(sentence(inlineMarkdown(property.description) || NOT_DOCUMENTED))) fail(`${at}: description missing or changed`);
        for (const value of property.schema.enum || []) {
          if (!line.includes(code(value))) fail(`${at}: allowed value ${value} not described`);
        }
        if (property.schema.default !== undefined && !line.includes("Default:")) fail(`${at}: default not described`);
      });
    });
  });

  it("documents the operation description and every response", () => {
    sweep(({ entry, document, item, fail }) => {
      const { operation, pointer } = sourceOperation(document, entry);
      const text = htmlToMarkdown(operation.description) || htmlToMarkdown(operation.summary) || `_${NOT_DOCUMENTED}_`;
      if (!item.request.description.includes(text)) fail(`${pointer}/description: not preserved`);
      for (const [status, raw] of Object.entries(operation.responses || {})) {
        const response = deref(document, raw, `${pointer}/responses/${status}`).node;
        const line = `- \`${status}\` — ${inlineMarkdown(response.description) || NOT_DOCUMENTED}`;
        if (!item.request.description.includes(line)) fail(`${pointer}/responses/${status}: not documented`);
      }
    });
  });

  it("keeps all visible text when converting source HTML to Markdown", () => {
    const failures = [];
    const visit = (node, pointer, file) => {
      if (Array.isArray(node)) return node.forEach((child, index) => visit(child, `${pointer}/${index}`, file));
      if (!isPlainObject(node)) return;
      for (const [key, value] of Object.entries(node)) {
        if (key === "description" && typeof value === "string") {
          const before = visibleWords(value);
          const after = visibleWords(htmlToMarkdown(value), { markdown: true });
          if (before.join(" ") !== after.join(" ")) failures.push(`${file}${pointer}/description`);
        } else {
          visit(value, `${pointer}/${pointerToken(key)}`, file);
        }
      }
    };
    for (const { entry, document } of operations) visit(document, "#", entry.json);
    assert.deepEqual(failures, []);
  });
});

describe("pagination guidance", () => {
  const POSITION = ["offset", "pageOffset", "pageIndex"];

  it("quotes each offset-style paging parameter and reserves uncertainty for undescribed ones", () => {
    sweep(({ entry, document, item, fail }) => {
      const op = normaliseOperation(document);
      const fields = new Map(op.fields.map((field) => [field.name, field]));
      if (fields.has("nextPageToken") || !POSITION.some((name) => fields.has(name))) return;
      const section = item.request.description.split("### Pagination\n\n")[1]?.split("\n### ")[0];
      if (!section) return fail(": no Pagination section");
      for (const name of ["offset", "maxReturn", "pageOffset", "pageIndex", "pageSize"].filter((key) => fields.has(key))) {
        const line = `- \`${name}\`: ${sentence(inlineMarkdown(fields.get(name).description) || NOT_DOCUMENTED)}`;
        if (!section.includes(line)) fail(`: ${name} not quoted from the source`);
      }
      const convention = OFFSET_PAGING.find(({ position, size }) => fields.has(position) && fields.has(size));
      const uncertain = section.includes("does not say whether it counts records or pages");
      if (convention) {
        if (!section.includes(`](${convention.url})`) || !section.includes(`add the \`${convention.size}\` value you used to \`${convention.position}\``)) fail(": documented convention not explained");
        if (uncertain) fail(": uncertainty notice despite a documented convention");
      } else {
        const undescribed = POSITION.some((name) => fields.has(name) && !fields.get(name).description.trim());
        if (uncertain !== undescribed) fail(`: uncertainty notice ${uncertain ? "present" : "missing"}`);
      }
    });
  });
});

/** Walk a source schema the way the exporter documents it, reporting each property's source pointer. */
function walkProperties(document, resolver, node, pointer, prefix, seen, visit) {
  const { node: schema, pointer: at } = deref(document, node, pointer);
  if (!isPlainObject(schema)) return;
  const merged = mergeAllOf(document, schema, at);
  if (merged.schema.type === "array" || merged.schema.items) {
    walkProperties(document, resolver, merged.schema.items || {}, `${at}/items`, `${prefix}[]`, seen, visit);
    return;
  }
  const name = typeof node?.$ref === "string" ? node.$ref : null;
  const nextSeen = name ? new Set(seen).add(name) : seen;
  const required = new Set(isResponseModel(merged.schema, resolver) ? [] : merged.schema.required || []);
  for (const [property, raw] of Object.entries(merged.schema.properties || {})) {
    const propertyPointer = `${merged.pointers[property] || at}/properties/${pointerToken(property)}`;
    const target = deref(document, raw, propertyPointer).node;
    const path = prefix ? `${prefix}.${property}` : property;
    visit({ path, pointer: propertyPointer, required: required.has(property), description: target?.description || "", schema: mergeAllOf(document, target || {}, propertyPointer).schema });
    const ref = raw?.$ref || (target?.type === "array" ? target.items?.$ref : null);
    if (!(ref && nextSeen.has(ref))) walkProperties(document, resolver, raw, propertyPointer, path, nextSeen, visit);
  }
  if (isPlainObject(merged.schema.additionalProperties)) {
    walkProperties(document, resolver, merged.schema.additionalProperties, `${at}/additionalProperties`, `${prefix}.*`, nextSeen, visit);
  }
}

function mergeAllOf(document, schema, pointer) {
  if (!Array.isArray(schema.allOf)) return { schema, pointers: Object.fromEntries(Object.keys(schema.properties || {}).map((key) => [key, pointer])) };
  const { allOf, ...rest } = schema;
  let merged = { properties: {}, required: [] };
  const pointers = {};
  allOf.forEach((part, index) => {
    const resolved = deref(document, part, `${pointer}/allOf/${index}`);
    const inner = mergeAllOf(document, resolved.node, resolved.pointer);
    merged = { ...merged, ...inner.schema, properties: { ...merged.properties, ...inner.schema.properties }, required: [...merged.required, ...(inner.schema.required || [])] };
    Object.assign(pointers, inner.pointers);
  });
  for (const key of Object.keys(rest.properties || {})) pointers[key] = pointer;
  return { schema: { ...merged, ...rest, properties: { ...merged.properties, ...rest.properties }, required: [...merged.required, ...(rest.required || [])] }, pointers };
}

describe("request bodies", () => {
  const byOperation = operations.map(({ entry, document }) => ({ entry, op: normaliseOperation(document), item: itemFor(entry).item }));

  it("use the body mode that matches the declared media type", () => {
    for (const { entry, op, item } of byOperation) {
      const body = item.request.body;
      if (!op.body) {
        assert.equal(body, undefined, `${entry.json}: unexpected body`);
        continue;
      }
      const expected = { json: "raw", raw: "raw", form: "urlencoded", multipart: "formdata" }[op.body.kind];
      assert.equal(body.mode, expected, `${entry.json}: ${op.body.contentType}`);
      if (body.mode === "raw" && op.body.kind === "json") assert.equal(body.options.raw.language, "json", entry.json);
    }
  });

  it("start JSON bodies with parseable, minimal structures without invented values", () => {
    for (const { entry, op, item } of byOperation) {
      const body = item.request.body;
      if (body?.mode !== "raw" || !body.raw) continue;
      const value = JSON.parse(body.raw);
      assertSkeleton(value, op.body.schema, op.resolver, entry.json);
      if (op.body.example !== undefined) assert.notDeepEqual(value, op.body.example, `${entry.json}: copied the source example`);
    }
  });

  it("leave form values empty unless the source gives a default or a single allowed value, and never select files", () => {
    for (const { entry, op, item } of byOperation) {
      const rows = item.request.body?.urlencoded || item.request.body?.formdata || [];
      for (const row of rows) {
        const field = op.body.fields.find((candidate) => candidate.name === row.key);
        if (row.type === "file") {
          assert.equal(row.src, undefined, `${entry.json} ${row.key}: file preselected`);
          continue;
        }
        const allowed = ["", field.schema.default === undefined ? "" : String(field.schema.default), field.schema.enum?.length === 1 ? String(field.schema.enum[0]) : ""];
        assert.ok(allowed.includes(row.value), `${entry.json} ${row.key}: value ${row.value}`);
      }
    }
  });

  it("send optional bodies on GET-like requests only when the user adds one", () => {
    for (const { entry, op, item } of byOperation) {
      if (!op.body || !["GET", "HEAD"].includes(op.method)) {
        assert.equal(item.protocolProfileBehavior, undefined, entry.json);
        continue;
      }
      assert.deepEqual(item.protocolProfileBehavior, { disableBodyPruning: true }, entry.json);
      if (!op.body.required) assert.equal(item.request.body.raw, "", entry.json);
    }
  });
});

/** A starter body may contain only required properties, nulls, empty containers and single allowed values. */
function assertSkeleton(value, schema, resolver, label, path = "body") {
  const resolved = resolver.flatten(schema || {});
  if (Array.isArray(value)) {
    assert.ok(value.length <= 1, `${label} ${path}: more than one array element`);
    value.forEach((element) => assertSkeleton(element, resolved.items, resolver, label, `${path}[]`));
    return;
  }
  if (isPlainObject(value)) {
    const required = new Set(resolved.required || []);
    for (const [key, child] of Object.entries(value)) {
      assert.ok(required.has(key), `${label} ${path}.${key}: optional property in the starter body`);
      assertSkeleton(child, resolved.properties?.[key], resolver, label, `${path}.${key}`);
    }
    return;
  }
  if (value === null) return;
  assert.deepEqual(resolved.enum, [value], `${label} ${path}: invented value ${JSON.stringify(value)}`);
}
