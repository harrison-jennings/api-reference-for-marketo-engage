# EmailTemplateUsedByResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | Yes | Id of the asset |  |
| `name` | string | Yes | Name of the asset |  |
| `type` | string | Yes | Type of asset |  |
| `status` | string | Yes | Status filter for draft or approved versions | enum: approved, draft |
| `updatedAt` | string (date-time) | Yes | Datetime the asset was most recently updated |  |

## Generated example

```json
{
  "id": 123,
  "name": "Example name",
  "type": "string",
  "status": "approved",
  "updatedAt": "2026-01-15T10:30:00Z"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
