# ChangeLeadProgramStatusOutputData

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | Yes | Unique integer id of a lead record |  |
| `reasons` | array of [`Reason`](./reason.md) | No | List of reasons why an operation did not succeed. Reasons are only present in API responses and should not be submitted |  |
| `status` | string | Yes | Program status of the record. Permissible values can be retrieve from the Get Channel by Name API for the designated program's channel |  |

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
