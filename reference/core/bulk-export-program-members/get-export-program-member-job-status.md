# Get Export Program Member Job Status

**Method:** `GET`  
**Path:** `/bulk/v1/program/members/export/{exportId}/status.json`  
**Tag:** Bulk Export Program Members  
**Operation ID:** `getExportProgramMembersStatusUsingGET`  

Returns status of an export job. Job status is available for 30 days after Completed or Failed status was reached. Required Permissions: Read-Only Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `exportId` | string | Yes | Id of export batch job. |  |

### Example request

```http
GET {{base_url}}/bulk/v1/program/members/export/{{exportId}}/status.json
Accept: application/json
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
