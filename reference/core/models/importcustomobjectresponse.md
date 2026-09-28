# ImportCustomObjectResponse

**Type:** `object`

Response containing import status information

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `batchId` | integer (int32) | Yes | Unique integer id of the import batch |  |
| `importTime` | string | No | Time spent on the batch |  |
| `message` | string | No | Status message of the batch |  |
| `numOfObjectsProcessed` | integer (int32) | No | Number of rows processed so far |  |
| `numOfRowsFailed` | integer (int32) | No | Number of rows failed so far |  |
| `numOfRowsWithWarning` | integer (int32) | No | Number of rows with a warning so far |  |
| `objectApiName` | string | Yes | Object API Name |  |
| `operation` | string | Yes | Bulk operation type. Can be import or export |  |
| `status` | string | Yes | Status of the batch |  |

## Generated example

```json
{
  "batchId": 123,
  "importTime": "string",
  "message": "string",
  "numOfObjectsProcessed": 123,
  "numOfRowsFailed": 123,
  "numOfRowsWithWarning": 123,
  "objectApiName": "Example name",
  "operation": "string",
  "status": "string"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
