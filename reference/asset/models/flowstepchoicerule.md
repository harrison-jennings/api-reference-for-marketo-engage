# FlowStepChoiceRule

**Type:** `object`

Condition describing when a flow step choice applies

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | No | Name of the field tested by the condition |  |
| `operator` | string | No | Condition operator, for example 'is', 'is not', 'contains' |  |
| `ruleType` | string | No | Type of the condition | enum: Activity, Attribute |
| `ruleTypeId` | integer (int32) | No | Id of the activity type or field tested by the condition |  |
| `values` | array of string | No | Values the condition matches |  |

## Generated example

```json
{
  "name": "Example name",
  "operator": "string",
  "ruleType": "Activity",
  "ruleTypeId": 123,
  "values": [
    "string"
  ]
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
