"""Tests for scripts/build_marketo_api_reference.py (standard library only)."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from build_marketo_api_reference import linked_schema_type, schema_type  # noqa: E402


class LinkedSchemaTypeTest(unittest.TestCase):
    def test_links_a_referenced_model(self):
        self.assertEqual(
            linked_schema_type({"$ref": "#/definitions/TriggerCampaignRequest"}),
            "[`TriggerCampaignRequest`](../models/triggercampaignrequest.md)",
        )

    def test_links_openapi3_component_references(self):
        self.assertEqual(
            linked_schema_type({"$ref": "#/components/schemas/ErrorResponse"}),
            "[`ErrorResponse`](../models/errorresponse.md)",
        )

    def test_links_array_items(self):
        self.assertEqual(
            linked_schema_type({"type": "array", "items": {"$ref": "#/definitions/Lead"}}),
            "array of [`Lead`](../models/lead.md)",
        )

    def test_links_each_all_of_reference(self):
        self.assertEqual(
            linked_schema_type({"allOf": [{"$ref": "#/definitions/A"}, {"$ref": "#/definitions/B"}]}),
            "[`A`](../models/a.md) + [`B`](../models/b.md)",
        )

    def test_leaves_types_without_models_unchanged(self):
        for schema in ({"type": "string"}, {"type": "integer", "format": "int64"}, {"allOf": [{"type": "object"}]}):
            self.assertEqual(linked_schema_type(schema), schema_type(schema))

    def test_links_from_model_pages_to_sibling_models(self):
        self.assertEqual(
            linked_schema_type({"type": "array", "items": {"$ref": "#/definitions/Error"}}, from_operation=False),
            "array of [`Error`](./error.md)",
        )


class SchemaTypeTest(unittest.TestCase):
    def test_describes_arrays_without_angle_brackets(self):
        # Markdown passes <...> through as an HTML tag, which browsers hide.
        cases = {
            "array of string": {"type": "array", "items": {"type": "string"}},
            "array of integer (int32)": {"type": "array", "items": {"type": "integer", "format": "int32"}},
            "array of array of Lead": {"type": "array", "items": {"type": "array", "items": {"$ref": "#/definitions/Lead"}}},
        }
        for expected, schema in cases.items():
            self.assertEqual(schema_type(schema), expected)
            self.assertNotIn("<", linked_schema_type(schema))

    def test_names_referenced_models(self):
        self.assertEqual(schema_type({"$ref": "#/definitions/Lead"}), "Lead")


if __name__ == "__main__":
    unittest.main()
