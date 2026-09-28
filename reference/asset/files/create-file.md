# Create File

**Method:** `POST`  
**Path:** `/rest/asset/v1/files.json`  
**Tag:** Files  
**Operation ID:** `createFileUsingPOST`  

Creates a new file from the included payload. Required Permissions: Read-Write Assets

## Formats

- **Request:** `multipart/form-data`
- **Response:** `application/json`

## Request

### Request body

**Name:** `createFileRequest`  
**Required:** Yes  
**Schema:** [`CreateFileRequest`](../models/createfilerequest.md)

createFileRequest

#### Generated example

```json
{
  "description": "string",
  "file": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "insertOnly": true,
  "name": "Example name"
}
```

### Referenced models

- [`CreateFileRequest`](../models/createfilerequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/files.json
Content-Type: multipart/form-data
Accept: application/json

{
  "description": "string",
  "file": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "insertOnly": true,
  "name": "Example name"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfFileResponse`](../models/responseoffileresponse.md)

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
      "description": "string",
      "folder": {
        "id": 123,
        "name": "Example name",
        "type": "string"
      },
      "id": 123,
      "mimeType": "string",
      "name": "Example name",
      "size": 123,
      "updatedAt": "2026-01-15T10:30:00Z",
      "url": "https://example.com"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfFileResponse`](../models/responseoffileresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
