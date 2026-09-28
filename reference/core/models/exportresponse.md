# ExportResponse

**Type:** `object`

Response containing export job status information

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `createdAt` | string (date-time) | No | Date when the export request was created |  |
| `errorMsg` | string | No | Error message in case of "Failed" status |  |
| `exportId` | string | Yes | Unique id of the export job |  |
| `fileSize` | integer (int64) | No | Size of exported file in bytes. This will have a value only when status is "Completed", otherwise null |  |
| `fileChecksum` | string | No | SHA-256 hash of exported file. This will have a value only when status is "Completed", otherwise null |  |
| `finishedAt` | string (date-time) | No | Finish time of export job. This will have value only when status is "Completed" or "Failed", otherwise null |  |
| `format` | string | No | Format of file as given in the request ("CSV", "TSV", "SSV") |  |
| `numberOfRecords` | integer (int64) | No | Number of records in the export file. This will have value only when status is "Completed", otherwise null |  |
| `queuedAt` | string (date-time) | No | Queue time of export job. This will have value when "Queued" status is reached, before that null |  |
| `startedAt` | string (date-time) | No | Start time of export job. This will have value when "Processing" status is reached, before that null |  |
| `status` | string | Yes | Status of the export job ("Created","Queued","Processing","Canceled","Completed","Failed") |  |

## Generated example

```json
{
  "createdAt": "2026-01-15T10:30:00Z",
  "errorMsg": "string",
  "exportId": "123",
  "fileSize": 123,
  "fileChecksum": "string",
  "finishedAt": "2026-01-15T10:30:00Z",
  "format": "string",
  "numberOfRecords": 123,
  "queuedAt": "2026-01-15T10:30:00Z",
  "startedAt": "2026-01-15T10:30:00Z",
  "status": "string"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
