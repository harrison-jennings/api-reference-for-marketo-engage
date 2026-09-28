# SmartListRules

**Type:** `object`

JSON representation of smart list rules

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `filterMatchType` | string | Yes | Smart list filter match type (rule logic) | enum: all, any, custom |
| `triggers` | array of [`SmartListFilters`](./smartlistfilters.md) | Yes | List of smart list triggers |  |
| `filters` | array of [`SmartListFilters`](./smartlistfilters.md) | Yes | List of smart list filters |  |
| `filterCustomRuleLogic` | string | No | Custom rule logic, for example 1 and (2 or 3). Present when filterMatchType is custom |  |

## Generated example

```json
{
  "filterMatchType": "all",
  "triggers": [
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
  ],
  "filters": [
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
  ],
  "filterCustomRuleLogic": "string"
}
```

## Referenced models

- [`SmartListFilters`](./smartlistfilters.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
