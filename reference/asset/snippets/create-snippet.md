# Create Snippet

**Method:** `POST`  
**Path:** `/rest/asset/v1/snippets.json`  
**Tag:** Snippets  
**Operation ID:** `createSnippetUsingPOST`  

Creates a new snippet. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Request body

**Name:** `createSnippetRequest`  
**Required:** Yes  
**Schema:** [`CreateSnippetRequest`](../models/createsnippetrequest.md)

createSnippetRequest

#### Generated example

```json
{
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "name": "Example name"
}
```

### Referenced models

- [`CreateSnippetRequest`](../models/createsnippetrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/snippets.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "name": "Example name"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSnippetResponse`](../models/responseofsnippetresponse.md)

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
        "value": 123,
        "type": "Folder",
        "folderName": "Example name"
      },
      "id": 123,
      "name": "Example name",
      "status": "string",
      "updatedAt": "2026-01-15T10:30:00Z",
      "url": "https://example.com",
      "workspace": "string"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfSnippetResponse`](../models/responseofsnippetresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
