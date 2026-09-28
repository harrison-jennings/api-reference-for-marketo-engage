# Create Export Custom Object Job

**Method:** `POST`  
**Path:** `/bulk/v1/customobjects/{apiName}/export/create.json`  
**Tag:** Bulk Export Custom Objects  
**Operation ID:** `createExportCustomObjectsUsingPOST`  

Create export job for search criteria defined via "filter" parameter. Request returns the "exportId" which is passed as a parameter in subsequent calls to Bulk Export Custom Object endpoints. Use Enqueue Export Custom Object Job endpoint to queue the export job for processing. Use Get Export Custom Object Job Status endpoint to retrieve status of export job. Required Permissions: Read-Only Custom Object

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | Yes | API Name of the custom object for the export batch job. |  |

### Request body

**Name:** `exportCustomObjectRequest`  
**Required:** No  
**Schema:** [`ExportCustomObjectRequest`](../models/exportcustomobjectrequest.md)

exportCustomObjectRequest<br><br>ColumnHeaderNames: A JSON object containing key-value pairs of custom object attributes and column header names.<br><br>Example:<br><code>"columnHeaderNames":{<br>  "attrName1":"value1",<br>  "attrName2":"value2",<br>  "attrName3":"value3"<br>}</code><br>

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
    "updatedAt": {
      "endAt": "string",
      "startAt": "string"
    },
    "smartListId": 123,
    "smartListName": "Example name",
    "staticListId": 123,
    "staticListName": "Example name"
  },
  "format": "string"
}
```

### Referenced models

- [`ExportCustomObjectRequest`](../models/exportcustomobjectrequest.md)

### Example request

```http
POST {{base_url}}/bulk/v1/customobjects/{{apiName}}/export/create.json
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
    "updatedAt": {
      "endAt": "string",
      "startAt": "string"
    },
    "smartListId": 123,
    "smartListName": "Example name",
    "staticListId": 123,
    "staticListName": "Example name"
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
