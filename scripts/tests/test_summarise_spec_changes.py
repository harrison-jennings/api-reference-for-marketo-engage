"""Tests for scripts/summarise_spec_changes.py (standard library only)."""

from __future__ import annotations

import copy
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from summarise_spec_changes import operation_changes, schemas  # noqa: E402

SWAGGER2 = {
    "swagger": "2.0",
    "paths": {
        "/rest/v1/leads.json": {
            "post": {
                "summary": "Sync Leads",
                "description": "Syncs leads.",
                "parameters": [{"in": "body", "name": "body", "schema": {"$ref": "#/definitions/SyncLeadRequest"}}],
                "responses": {"200": {"description": "OK", "schema": {"$ref": "#/definitions/ResponseOfLead"}}},
            }
        }
    },
    "definitions": {
        "SyncLeadRequest": {"type": "object", "properties": {"action": {"type": "string"}}},
        "ResponseOfLead": {"type": "object", "properties": {"success": {"type": "boolean"}}},
    },
}

OPENAPI3 = {
    "openapi": "3.0.1",
    "paths": {
        "/subscriptions/{munchkinId}/persons": {
            "post": {
                "summary": "Sync Persons",
                "description": "Upserts persons.",
                "parameters": [{"in": "path", "name": "munchkinId", "required": True, "schema": {"type": "string"}}],
                "requestBody": {"content": {"application/json": {"schema": {"$ref": "#/components/schemas/SyncPersonsRequest"}}}},
                "responses": {"202": {"description": "Accepted"}},
            }
        }
    },
    "components": {"schemas": {"SyncPersonsRequest": {"type": "object", "properties": {"priority": {"type": "string"}}}}},
}


def operation(document):
    return next(iter(next(iter(document["paths"].values())).values()))


class SchemasTest(unittest.TestCase):
    def test_reads_swagger2_definitions_and_openapi3_components(self):
        self.assertEqual(set(schemas(SWAGGER2)), {"SyncLeadRequest", "ResponseOfLead"})
        self.assertEqual(set(schemas(OPENAPI3)), {"SyncPersonsRequest"})
        self.assertEqual(schemas({"openapi": "3.0.1", "paths": {}}), {})


class OperationChangesTest(unittest.TestCase):
    def test_identical_documents_have_no_changes(self):
        self.assertEqual(operation_changes(SWAGGER2, copy.deepcopy(SWAGGER2)), ([], set()))
        self.assertEqual(operation_changes(OPENAPI3, copy.deepcopy(OPENAPI3)), ([], set()))

    def test_openapi3_component_schema_change_behind_unchanged_ref(self):
        after = copy.deepcopy(OPENAPI3)
        after["components"]["schemas"]["SyncPersonsRequest"]["properties"]["partitionName"] = {"type": "string"}
        changes, _ = operation_changes(OPENAPI3, after)
        self.assertEqual(changes, ["changed models `SyncPersonsRequest`"])

    def test_openapi3_request_body_change(self):
        after = copy.deepcopy(OPENAPI3)
        operation(after)["requestBody"]["required"] = True
        self.assertEqual(operation_changes(OPENAPI3, after)[0], ["request body"])

    def test_openapi3_new_and_removed_component_schemas(self):
        after = copy.deepcopy(OPENAPI3)
        after["components"]["schemas"] = {"SyncPersonsRequestV2": {"type": "object"}}
        self.assertEqual(
            operation_changes(OPENAPI3, after)[0],
            ["new models `SyncPersonsRequestV2`", "removed models `SyncPersonsRequest`"],
        )

    def test_swagger2_parameters_models_and_dated_notices(self):
        after = copy.deepcopy(SWAGGER2)
        op = operation(after)
        op["parameters"].append({"in": "query", "name": "partitionName", "type": "string"})
        op["description"] = "Syncs leads. Beginning 2026-09-30, requests over 300 records fail."
        after["definitions"]["ResponseOfLead"]["properties"]["warnings"] = {"type": "array"}
        changes, dates = operation_changes(SWAGGER2, after)
        self.assertEqual(
            changes,
            ["new parameters `partitionName`", "description", "changed models `ResponseOfLead`"],
        )
        self.assertEqual(dates, {"2026-09-30"})

    def test_existing_dates_are_not_reported_again(self):
        before = copy.deepcopy(SWAGGER2)
        operation(before)["description"] = "Beginning 2026-12-30, limits apply."
        after = copy.deepcopy(before)
        operation(after)["description"] = "Beginning 2026-12-30, limits apply to all lists."
        self.assertEqual(operation_changes(before, after)[1], set())


if __name__ == "__main__":
    unittest.main()
