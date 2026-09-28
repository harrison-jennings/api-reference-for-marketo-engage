# BulkUsedByItemDTO

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | string | No |  |  |
| `name` | string | No |  |  |
| `count` | integer (int32) | No | Number of places the asset is used. |  |
| `used` | boolean | No | Whether the asset is used by any other asset. |  |

## Generated example

```json
{
  "id": "123",
  "name": "Example name",
  "count": 123,
  "used": true
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
