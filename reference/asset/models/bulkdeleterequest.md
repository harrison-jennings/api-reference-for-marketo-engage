# BulkDeleteRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `assetIds` | array of string | Yes | Set of asset IDs to delete. Maximum 20 per request. |  |
| `ignoreUsedBy` | boolean | No | If true, deletes assets even if they are referenced by other assets. |  |

## Generated example

```json
{
  "assetIds": [
    "string"
  ],
  "ignoreUsedBy": true
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
