# SegmentsResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `createdAt` | string (date-time) | No | Datetime the asset was created |  |
| `description` | string | No | Description of the asset |  |
| `id` | integer (int64) | No | Id of the asset |  |
| `name` | string | No | Name of the asset |  |
| `segmentationId` | integer (int32) | Yes | Id of the Segmentation |  |
| `updatedAt` | string (date-time) | No | Datetime the asset was most recently updated |  |
| `url` | string | No | Url of the asset in the Marketo UI |  |

## Generated example

```json
{
  "createdAt": "2026-01-15T10:30:00Z",
  "description": "string",
  "id": 123,
  "name": "Example name",
  "segmentationId": 123,
  "updatedAt": "2026-01-15T10:30:00Z",
  "url": "https://example.com"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
