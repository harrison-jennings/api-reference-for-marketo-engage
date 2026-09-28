# FormResponse

**Type:** `object`

Disposition of lead

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of lead |  |
| `status` | string | Yes |  | enum: created, updated, skipped |
| `reasons` | array of [`Reason`](./reason.md) | No | List of reasons why an operation did not succeed. Reasons are only present in API responses and should not be submitted |  |

## Generated example

```json
{
  "id": 123,
  "status": "created",
  "reasons": [
    {
      "code": "string",
      "message": "string"
    }
  ]
}
```

## Referenced models

- [`Reason`](./reason.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
