# Update File Content

**Method:** `POST`  
**Path:** `/rest/asset/v1/file/{id}/content.json`  
**Tag:** File Contents  
**Operation ID:** `updateContentUsingPOST`  

Replaces the current content of the file with the included payload. Required Permissions: Read-Write Assets

## Formats

- **Request:** `multipart/form-data`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id for file in database |  |

### Request body

**Name:** `request`  
**Required:** Yes  
**Schema:** [`UpdateFileContentRequest`](../models/updatefilecontentrequest.md)

request

#### Generated example

```json
{
  "file": "string",
  "id": 123
}
```

### Referenced models

- [`UpdateFileContentRequest`](../models/updatefilecontentrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/file/{{id}}/content.json
Content-Type: multipart/form-data
Accept: application/json

{
  "file": "string",
  "id": 123
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
