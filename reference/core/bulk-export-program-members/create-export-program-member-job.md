# Create Export Program Member Job

**Method:** `POST`  
**Path:** `/bulk/v1/program/members/export/create.json`  
**Tag:** Bulk Export Program Members  
**Operation ID:** `createExportProgramMembersUsingPOST`  

Create export job for search criteria defined via "filter" parameter. Request returns the "exportId" which is passed as a parameter in subsequent calls to Bulk Export Program Members endpoints. Use Enqueue Export Program Member Job endpoint to queue the export job for processing. Use Get Export Program Member Job Status endpoint to retrieve status of export job. Required Permissions: Read-Only Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `exportProgramMemberRequest`  
**Required:** No  
**Schema:** [`ExportProgramMemberRequest`](../models/exportprogrammemberrequest.md)

exportProgramMemberRequest<br><br>ColumnHeaderNames: A JSON object containing key-value pairs of field and column header names.<br><br>Example:<br><code>"columnHeaderNames":{<br>  "firstName":"First Name",<br>  "lastName":"Last Name",<br>  "email":"Email Address"<br>}</code><br>

#### Generated example

```json
{
  "columnHeaderNames": {
    "name": "Example name",
    "value": "string"
  },
  "fields": [
    "string"
  ],
  "filter": {
    "programId": 123,
    "programIds": [
      123
    ],
    "isExhausted": true,
    "nurtureCadence": "paused",
    "statusNames": [
      "Example name"
    ],
    "updatedAt": {
      "endAt": "string",
      "startAt": "string"
    }
  },
  "format": "string"
}
```

### Referenced models

- [`ExportProgramMemberRequest`](../models/exportprogrammemberrequest.md)

### Example request

```http
POST {{base_url}}/bulk/v1/program/members/export/create.json
Content-Type: application/json
Accept: application/json

{
  "columnHeaderNames": {
    "name": "Example name",
    "value": "string"
  },
  "fields": [
    "string"
  ],
  "filter": {
    "programId": 123,
    "programIds": [
      123
    ],
    "isExhausted": true,
    "nurtureCadence": "paused",
    "statusNames": [
      "Example name"
    ],
    "updatedAt": {
      "endAt": "string",
      "startAt": "string"
    }
  },
  "format": "string"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfExportResponse`](../models/responseofexportresponse.md)

#### Generated example

```json
{
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ],
  "requestId": "123",
  "result": [
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
  ],
  "success": false,
  "warnings": [
    {
      "code": 123,
      "message": "string"
    }
  ]
}
```

### Referenced models

- [`ResponseOfExportResponse`](../models/responseofexportresponse.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
