# ImportLeadResponse

**Type:** `object`

Response containing import status information

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `batchId` | integer (int32) | Yes | Unique integer id of the import batch |  |
| `importId` | string | No |  |  |
| `message` | string | No |  |  |
| `numOfLeadsProcessed` | integer (int32) | Yes | Number of rows processed so far |  |
| `numOfRowsFailed` | integer (int32) | No | Number of rows failed so far |  |
| `numOfRowsWithWarning` | integer (int32) | No | Number of rows with a warning so far |  |
| `status` | string | Yes | Status of the batch |  |

## Generated example

```json
{
  "batchId": 123,
  "importId": "123",
  "message": "string",
  "numOfLeadsProcessed": 123,
  "numOfRowsFailed": 123,
  "numOfRowsWithWarning": 123,
  "status": "string"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
