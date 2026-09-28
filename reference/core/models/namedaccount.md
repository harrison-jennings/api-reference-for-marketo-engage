# NamedAccount

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `marketoGUID` | string | Yes | Unique GUID of the custom object records |  |
| `reasons` | array of [`Reason`](./reason.md) | No | List of reasons why an operation did not succeed. Reasons are only present in API responses and should not be submitted |  |
| `seq` | integer (int32) | Yes | Integer indicating the sequence of the record in response. This value is correlated to the order of the records included in the request input. Seq should only be part of responses and should not be submitted. |  |
| `status` | string | No |  | enum: created, updated, deleted, skipped, added, removed |

## Generated example

```json
{
  "marketoGUID": "123",
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
