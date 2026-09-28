# SmartCampaignRules

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `filters` | array of [`SmartCampaignRuleType`](./smartcampaignruletype.md) | No | Filter rule types |  |
| `triggers` | array of [`SmartCampaignRuleType`](./smartcampaignruletype.md) | No | Trigger rule types |  |
| `predictiveFilters` | object | No | Predictive filter rule types. Present when predictive attributes are available |  |

## Generated example

```json
{
  "filters": [
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
  ],
  "triggers": [
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
  ],
  "predictiveFilters": {}
}
```

## Referenced models

- [`SmartCampaignRuleType`](./smartcampaignruletype.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
