# SmartCampaignUsedByAsset

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | Yes | Id of the asset |  |
| `name` | string | Yes | Name of the asset |  |
| `compType` | string | No | Type of the asset |  |
| `subType` | string | No | Subtype of the asset |  |
| `status` | string | No | Status of the asset |  |
| `updatedAt` | string (date-time) | No | Datetime the asset was most recently updated |  |
| `programId` | integer (int32) | No | Id of the program containing the asset |  |
| `accessZoneId` | integer (int32) | No | Id of the workspace containing the asset |  |

## Generated example

```json
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
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
