# SmartCampaignFlowSteps

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `flowSteps` | array of [`SmartCampaignFlowStepActionType`](./smartcampaignflowstepactiontype.md) | No | Flow step action types |  |

## Generated example

```json
{
  "flowSteps": [
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

- [`SmartCampaignFlowStepActionType`](./smartcampaignflowstepactiontype.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
