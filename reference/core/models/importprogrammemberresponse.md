# ImportProgramMemberResponse

**Type:** `object`

Response containing import status information

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `batchId` | integer (int32) | Yes | Unique integer id of the import job |  |
| `importId` | string | Yes | Unique integer id of the import job |  |
| `status` | string | Yes | Status of the import job |  |

## Generated example

```json
{
  "batchId": 123,
  "importId": "123",
  "status": "string"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
