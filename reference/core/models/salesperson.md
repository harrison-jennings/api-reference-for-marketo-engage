# SalesPerson

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | No | Unique integer id of the salesperson record |  |
| `reasons` | array of [`Reason`](./reason.md) | No | List of reasons why an operation did not succeed. Reasons are only present in API responses and should not be submitted |  |
| `seq` | integer (int32) | No | Integer indicating the sequence of the record in response. This value is correlated to the order of the records included in the request input. Seq should only be part of responses and should not be submitted. |  |
| `status` | string | No | Status of the operation performed on the record | enum: created, updated, deleted, skipped, added, removed |

## Generated example

```json
{
  "id": 123,
  "reasons": [
    {
      "code": "string",
      "message": "string"
    }
  ],
  "seq": 123,
  "status": "created"
}
```

## Referenced models

- [`Reason`](./reason.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
