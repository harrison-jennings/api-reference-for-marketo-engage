import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { normaliseOperation } from "../docs/assets/request-builder/operation.js";
import { buildRequest } from "../docs/assets/request-builder/request.js";
import { MOCK_DATE_TIME, generateResponseMock } from "../docs/assets/request-builder/mock.js";
import {
  documentedDefaultFields,
  generateRealisticResponse,
  queryList,
  requestedFields,
} from "../docs/assets/request-builder/behaviour.js";
import { loadOperation } from "./helpers.js";

/** Build the request for an operation and return its realistic 200 mock. */
function mock(id, state, code = "200") {
  const op = normaliseOperation(loadOperation(id));
  const request = buildRequest(op, state);
  assert.equal(request.valid, true, JSON.stringify(request.errors));
  return generateRealisticResponse(op, code, request);
}

describe("reading the request", () => {
  it("splits comma-separated and repeated query values", () => {
    const request = { query: [["fields", "firstName, lastName"], ["fields", "firstName"], ["other", "x"]] };
    assert.deepEqual(queryList(request, "fields"), ["firstName", "lastName", "firstName"]);
    assert.deepEqual(requestedFields(request), ["firstName", "lastName"]);
    assert.deepEqual(requestedFields({ query: [] }), []);
  });

  it("reads documented default fields from parameter descriptions", () => {
    assert.deepEqual(
      documentedDefaultFields("Comma separated list of field names. If omitted, the following default fields will be returned: email, updatedAt, createdAt, lastName, firstName, and id."),
      ["email", "updatedAt", "createdAt", "lastName", "firstName", "id"],
    );
    assert.deepEqual(
      documentedDefaultFields("Comma-separated list of lead fields to return for each record. If unset will return email, updatedAt, createdAt, lastName, firstName and id"),
      ["email", "updatedAt", "createdAt", "lastName", "firstName", "id"],
    );
    assert.deepEqual(
      documentedDefaultFields("Comma-separated list of fields to return for each record. If unset marketoGuid, dedupeFields, updatedAt, createdAt will be returned"),
      ["marketoGuid", "updatedAt", "createdAt"],
    );
    assert.deepEqual(documentedDefaultFields("Comma-separated list of fields to include in the response"), []);
  });
});

describe("reads", () => {
  it("returns the looked-up lead with the documented default fields", () => {
    const response = mock("core/leads/get-lead-by-id", { values: { "path:leadId": "318581" } });
    assert.deepEqual(response.body.result, [{
      id: 318581,
      email: "example@example.com",
      updatedAt: MOCK_DATE_TIME,
      createdAt: MOCK_DATE_TIME,
      lastName: "Example Last Name",
      firstName: "Example First Name",
    }]);
    assert.deepEqual(response.notes, { requested: [], defaults: ["email", "updatedAt", "createdAt", "lastName", "firstName"] });
    assert.deepEqual(response.body.errors, []);
    assert.equal(response.body.success, true);
  });

  it("returns requested fields, including custom fields, instead of the defaults", () => {
    const response = mock("core/leads/get-lead-by-id", {
      values: { "path:leadId": "318581", "query:fields": "firstName\nleadScore__c\nsfdcLeadId" },
    });
    assert.deepEqual(response.body.result, [{
      id: 318581,
      firstName: "Example First Name",
      leadScore__c: "Example Lead Score C",
      sfdcLeadId: 1234,
    }]);
    assert.deepEqual(response.notes.requested, ["firstName", "leadScore__c", "sfdcLeadId"]);
  });

  it("returns one record per filter value with the filter field set", () => {
    const response = mock("core/leads/get-leads-by-filter-type", {
      values: { "query:filterType": "email", "query:filterValues": "a@example.com\nb@example.com\nc@example.com" },
    });
    assert.deepEqual(response.body.result.map((lead) => [lead.id, lead.email]), [
      [1234, "a@example.com"],
      [1235, "b@example.com"],
      [1236, "c@example.com"],
    ]);
    assert.ok(response.body.result.every((lead) => !("status" in lead) && !("reason" in lead) && !("membership" in lead)));
  });

  it("sets a custom filter field when it is returned", () => {
    const response = mock("core/leads/get-leads-by-filter-type", {
      values: { "query:filterType": "externalId__c", "query:filterValues": "ext-1\next-2", "query:fields": "externalId__c\nemail" },
    });
    assert.deepEqual(response.body.result.map((lead) => lead.externalId__c), ["ext-1", "ext-2"]);
  });

  it("caps records at batchSize", () => {
    const response = mock("core/leads/get-leads-by-filter-type", {
      values: { "query:filterType": "id", "query:filterValues": "1\n2\n3", "query:batchSize": "2" },
    });
    assert.deepEqual(response.body.result.map((lead) => lead.id), [1, 2]);
  });

  it("keeps properties documented as only returned via the current operation", () => {
    const byProgram = mock("core/leads/get-leads-by-program-id", { values: { "path:programId": "1001" } });
    assert.ok(byProgram.body.result.every((lead) => "membership" in lead));
    assert.equal(byProgram.body.result.length, 2, "paginated reads are not single lookups");
  });

  it("uses marketoGUID and seq for custom object reads and skips placeholder default names", () => {
    const response = mock("core/custom-objects/get-custom-objects", {
      values: { "path:customObjectName": "car_c", "query:filterType": "vin", "query:filterValues": "V1\nV2" },
    });
    assert.deepEqual(response.body.result.map((record) => Object.keys(record)), [
      ["marketoGUID", "seq", "updatedAt", "createdAt"],
      ["marketoGUID", "seq", "updatedAt", "createdAt"],
    ]);
    assert.deepEqual(response.body.result.map((record) => record.seq), [0, 1]);
  });

  it("returns one change entry per requested field on Get Lead Changes", () => {
    const response = mock("core/activities/get-lead-changes", {
      values: { "query:nextPageToken": "TOKEN", "query:fields": "firstName\nemail" },
    });
    const [first] = response.body.result;
    assert.deepEqual(first.fields.map((change) => change.name), ["firstName", "email"]);
    assert.ok(!("firstName" in first), "fields selects changes, not record properties");
  });

  it("echoes the lookup key for lookups by name", () => {
    const response = mock("core/leads/get-lead-field-by-name", { values: { "path:fieldApiName": "leadScore__c" } });
    assert.equal(response.body.result.length, 1);
    assert.equal(response.body.result[0].name, "leadScore__c");
  });
});

describe("writes", () => {
  const lead = (input, action) => JSON.stringify({ action, lookupField: "email", input });

  it("returns one record per input with the status for the action", () => {
    const created = mock("core/leads/sync-leads", {
      bodyText: lead([{ email: "a@example.com" }, { email: "b@example.com" }], "createOnly"),
    });
    assert.deepEqual(created.body.result, [{ id: 1234, status: "created" }, { id: 1235, status: "created" }]);

    const updated = mock("core/leads/sync-leads", { bodyText: lead([{ id: 42, firstName: "A" }], "updateOnly") });
    assert.deepEqual(updated.body.result, [{ id: 42, status: "updated" }]);

    const upsert = mock("core/leads/sync-leads", { bodyText: lead([{ id: 42 }, { email: "new@example.com" }], "createOrUpdate") });
    assert.deepEqual(upsert.body.result.map((record) => record.status), ["updated", "created"]);
  });

  it("uses deleted, added and removed statuses where the schema allows them", () => {
    const deleted = mock("core/leads/delete-leads", { bodyText: JSON.stringify({ input: [{ id: 7 }, { id: 8 }] }) });
    assert.deepEqual(deleted.body.result, [{ id: 7, status: "deleted" }, { id: 8, status: "deleted" }]);

    const added = mock("core/static-lists/add-to-list", { values: { "path:listId": "1001", "query:id": "7\n8" } });
    assert.deepEqual(added.body.result, [{ id: 7, status: "added" }, { id: 8, status: "added" }]);

    const removed = mock("core/static-lists/remove-from-list", { values: { "path:listId": "1001", "query:id": "7" } });
    assert.deepEqual(removed.body.result, [{ id: 7, status: "removed" }]);
  });

  it("echoes marketoGUID and seq for custom object writes", () => {
    const response = mock("core/custom-objects/sync-custom-objects", {
      values: { "path:customObjectName": "car_c" },
      bodyText: JSON.stringify({ action: "updateOnly", input: [{ marketoGUID: "guid-1" }, { vin: "V2" }] }),
    });
    assert.deepEqual(response.body.result.map((record) => [record.seq, record.marketoGUID]), [[0, "guid-1"], [1, "Example Marketo GUID 2"]]);
    assert.ok(response.body.result.every((record) => !("reasons" in record)));
  });
});

describe("single-resource operations", () => {
  it("returns one bulk job with the job status for the operation", () => {
    const enqueued = mock("core/bulk-export-leads/enqueue-export-lead-job", { values: { "path:exportId": "ce45a7a1" } });
    assert.deepEqual(enqueued.body.result.map((job) => [job.exportId, job.status]), [["ce45a7a1", "Queued"]]);
    const canceled = mock("core/bulk-export-leads/cancel-export-lead-job", { values: { "path:exportId": "ce45a7a1" } });
    assert.equal(canceled.body.result[0].status, "Canceled");
  });

  it("returns the triggered campaign", () => {
    const response = mock("core/campaigns/request-campaign", {
      values: { "path:campaignId": "1029" },
      bodyText: JSON.stringify({ input: { leads: [{ id: 1 }] } }),
    });
    assert.deepEqual(response.body.result.map((campaign) => campaign.id), [1029]);
  });

  it("returns one object description and one record per lead field", () => {
    assert.equal(mock("core/companies/describe-companies", {}).body.result.length, 1);
    const customObject = mock("core/custom-objects/describe-custom-objects", { values: { "path:customObjectName": "car_c" } });
    assert.deepEqual(customObject.body.result.map((object) => object.apiName), ["car_c"]);
    assert.equal(mock("core/leads/describe-lead", {}).body.result.length, 2);
  });

  it("keeps paginated reads and records without the path key as lists", () => {
    assert.equal(mock("core/custom-objects/get-custom-object-dependent-assets", { values: { "path:apiName": "car_c" } }).body.result.length, 2);
  });

  it("returns the asset found by name", () => {
    const response = mock("asset/emails/get-email-by-name", { values: { "query:name": "Welcome Email" } });
    assert.deepEqual(response.body.result.map((email) => email.name), ["Welcome Email"]);
  });

  it("returns the created asset with the submitted values", () => {
    const response = mock("asset/email-templates/create-email-template", {
      values: { "form:name": "Newsletter", "form:folder": '{"id": 42, "type": "Program"}', "form:content": "<html></html>", "form:description": "Monthly" },
    });
    assert.equal(response.body.result.length, 1);
    const [template] = response.body.result;
    assert.deepEqual([template.name, template.folder, template.description], ["Newsletter", { id: 42, type: "Program" }, "Monthly"]);
  });

  it("gives a clone a new ID rather than the source asset's", () => {
    const response = mock("asset/emails/clone-email", {
      values: { "path:id": "1001", "form:name": "Copy of Welcome", "form:folder": '{"id": 42, "type": "Folder"}' },
    });
    assert.equal(response.body.result.length, 1);
    assert.notEqual(response.body.result[0].id, 1001);
    assert.equal(response.body.result[0].name, "Copy of Welcome");
  });

  it("reports list membership for each lead checked", () => {
    const response = mock("core/static-lists/member-of-list", { values: { "path:listId": "1001", "query:id": "7\n8" } });
    assert.deepEqual(response.body.result, [{ id: 7, status: "memberof" }, { id: 8, status: "memberof" }]);
  });
});

describe("request validation for Marketo record models", () => {
  it("does not require response-only or response-model properties on input", () => {
    const op = normaliseOperation(loadOperation("core/custom-objects/sync-custom-objects"));
    const request = buildRequest(op, {
      values: { "path:customObjectName": "car_c" },
      bodyText: JSON.stringify({ action: "createOrUpdate", dedupeBy: "dedupeFields", input: [{ vin: "V1" }] }),
    });
    assert.deepEqual(request.errors, []);
  });

  it("still enforces required properties on request models", () => {
    const op = normaliseOperation(loadOperation("core/custom-objects/sync-custom-objects"));
    const request = buildRequest(op, { values: { "path:customObjectName": "car_c" }, bodyText: JSON.stringify({ action: "createOnly" }) });
    assert.deepEqual(request.errors.map((error) => error.message), ["body.input is required."]);
  });

  it("omits response-only properties from generated starter bodies", async () => {
    const { initialBodyValue } = await import("../docs/assets/request-builder/request.js");
    const { generateMock } = await import("../docs/assets/request-builder/mock.js");
    const op = normaliseOperation(loadOperation("core/custom-objects/sync-custom-objects"));
    const [record] = initialBodyValue(op, generateMock).input;
    assert.deepEqual(Object.keys(record), ["marketoGUID"]);
  });

  it("accepts IDs in either the id query list or the body", () => {
    const op = normaliseOperation(loadOperation("core/static-lists/remove-from-list"));
    const byQuery = buildRequest(op, { values: { "path:listId": "1001", "query:id": "7" } });
    assert.deepEqual(byQuery.errors, []);
    const byBody = buildRequest(op, { values: { "path:listId": "1001" }, bodyText: JSON.stringify({ input: [{ id: 7 }] }) });
    assert.deepEqual(byBody.errors, []);
    const neither = buildRequest(op, { values: { "path:listId": "1001" } });
    assert.deepEqual(neither.errors, [{ key: "body", message: "Provide id values or a request body." }]);
  });
});

describe("scope", () => {
  it("leaves documented examples, error responses and non-record responses unchanged", () => {
    const op = normaliseOperation(loadOperation("data-ingestion/companies/sync-companies"));
    const request = buildRequest(op, { values: { "path:munchkinId": "123-ABC-456" } });
    assert.deepEqual(generateRealisticResponse(op, "400", request), { ...generateResponseMock(op, "400"), notes: { requested: [], defaults: [] } });

    const email = normaliseOperation(loadOperation("asset/emails/get-email-by-id"));
    const emailRequest = buildRequest(email, { values: { "path:id": "5555" } });
    const response = generateRealisticResponse(email, "200", emailRequest);
    assert.deepEqual(response.body.result.map((record) => record.id), [5555], "asset lookups echo the path ID too");
  });
});
