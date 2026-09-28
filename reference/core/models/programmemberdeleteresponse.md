# ProgramMemberDeleteResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `status` | string | Yes | Status of the operation performed on the record | enum: deleted, skipped |
| `reasons` | array of [`Reason`](./reason.md) | No | List of reasons why an operation did not succeed. Reasons are only present in API responses and should not be submitted |  |
| `leadId` | integer (int64) | Yes | Id of the lead associated to the program member |  |
| `seq` | integer (int32) | Yes | Integer indicating the sequence of the record in response. This value is correlated to the order of the records included in the request input. Seq should only be part of responses and should not be submitted. |  |

## Generated example

```json
{
  "status": "deleted",
  "reasons": [
    {
      "code": "string",
      "message": "string"
    }
  ],
  "leadId": 123,
  "seq": 123
}
```

## Referenced models

- [`Reason`](./reason.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
