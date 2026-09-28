# SmartListFilters

**Type:** `object`

JSON representation of smart list filters

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the filter |  |
| `name` | string | Yes | Name of filter |  |
| `ruleTypeId` | integer (int32) | Yes | Id of the rule type |  |
| `ruleType` | string | Yes | Type of rule | enum: Activity, Attribute |
| `operator` | string | Yes | Name of operator |  |
| `conditions` | array of [`SmartListConditions`](./smartlistconditions.md) | No | List of smart list conditions |  |

## Generated example

```json
{
  "id": 123,
  "name": "Example name",
  "ruleTypeId": 123,
  "ruleType": "Activity",
  "operator": "string",
  "conditions": [
    {
      "activityAttributeId": 123,
      "activityAttributeName": "Example name",
      "attributeId": 123,
      "attributeName": "Example name",
      "operator": "string",
      "values": [
        "string"
      ],
      "isPrimary": true,
      "isError": true,
      "errorMessage": "string"
    }
  ]
}
```

## Referenced models

- [`SmartListConditions`](./smartlistconditions.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
