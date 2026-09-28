# SmartCampaignUsedBy

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `usedByCount` | string | No | Number of assets that use the smart campaign |  |
| `usedBy` | array of [`SmartCampaignUsedByAsset`](./smartcampaignusedbyasset.md) | No | Assets that use the smart campaign |  |

## Generated example

```json
{
  "usedByCount": "string",
  "usedBy": [
    {
      "id": 123,
      "name": "Example name",
      "compType": "string",
      "subType": "string",
      "status": "string",
      "updatedAt": "2026-01-15T10:30:00Z",
      "programId": 123,
      "accessZoneId": 123
    }
  ]
}
```

## Referenced models

- [`SmartCampaignUsedByAsset`](./smartcampaignusedbyasset.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
