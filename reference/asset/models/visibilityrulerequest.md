# VisibilityRuleRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `altLabel` | string | No |  |  |
| `operator` | string | Yes | Operation to apply to target field. Evaluated against the list of values when applicable. | enum: is, isNot, isEmpty, isNotEmpty, startsWith, notStartsWith, endsWith, notEndsWith, contains, notContains, greaterThan, lessThan, atLeast, atMost, between, notBetween, notInTimeFrame, inPast, notInPast, after, before, inTimeFrame, onOrAfter, onOrBefore |
| `pickListValues` | array of [`PickListDTO`](./picklistdto.md) | No | Alternative label to display when rules are applied. |  |
| `subjectField` | string | Yes | Target field id to apply the operation defined by operator to |  |
| `values` | array of string | Yes | Comma-separated list of values to match against. Valid for operators 'is', 'isNot', 'startsWith', 'notStartsWith', 'endsWith', 'notEndsWith', 'contains', and 'notContains' |  |

## Generated example

```json
{
  "altLabel": "string",
  "operator": "is",
  "pickListValues": [
    {
      "isDefault": true,
      "label": "string",
      "selected": true,
      "value": "string"
    }
  ],
  "subjectField": "string",
  "values": [
    "string"
  ]
}
```

## Referenced models

- [`PickListDTO`](./picklistdto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
