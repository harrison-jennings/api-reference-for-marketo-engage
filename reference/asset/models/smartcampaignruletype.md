# SmartCampaignRuleType

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the rule type |  |
| `name` | string | Yes | Name of the rule type |  |
| `type` | string | Yes | Type of the rule | enum: activity, attribute |
| `constraints` | array of [`RuleConstraint`](./ruleconstraint.md) | No |  |  |

## Generated example

```json
{
  "id": 123,
  "name": "Example name",
  "type": "activity",
  "constraints": [
    {
      "id": 123,
      "name": "Example name",
      "dataType": "string",
      "primary": true,
      "operator": "string",
      "dbAttrib": true,
      "dbAttribId": "123",
      "dbObject": "string",
      "type": "string"
    }
  ]
}
```

## Referenced models

- [`RuleConstraint`](./ruleconstraint.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
