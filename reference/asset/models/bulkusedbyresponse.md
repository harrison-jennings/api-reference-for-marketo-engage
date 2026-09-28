# BulkUsedByResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `success` | boolean | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`BulkUsedByItemDTO`](./bulkusedbyitemdto.md) | No |  |  |

## Generated example

```json
{
  "success": true,
  "requestId": "123",
  "result": [
    {
      "id": "123",
      "name": "Example name",
      "count": 123,
      "used": true
    }
  ]
}
```

## Referenced models

- [`BulkUsedByItemDTO`](./bulkusedbyitemdto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
