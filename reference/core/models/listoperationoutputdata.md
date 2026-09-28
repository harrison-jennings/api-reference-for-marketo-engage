# ListOperationOutputData

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | Yes | Unique integer id of a lead record |  |
| `reasons` | array of [`Reason`](./reason.md) | No | List of reasons why an operation did not succeed. Reasons are only present in API responses and should not be submitted |  |
| `status` | string | No | Status of the operation performed on the record |  |

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
  "status": "string"
}
```

## Referenced models

- [`Reason`](./reason.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
