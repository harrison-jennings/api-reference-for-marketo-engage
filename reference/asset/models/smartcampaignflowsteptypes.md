# SmartCampaignFlowStepTypes

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `flowStepTypes` | array of [`SmartCampaignFlowStepType`](./smartcampaignflowsteptype.md) | No | Flow step types |  |

## Generated example

```json
{
  "flowStepTypes": [
    {
      "id": 123,
      "name": "Example name",
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
  ]
}
```

## Referenced models

- [`SmartCampaignFlowStepType`](./smartcampaignflowsteptype.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
