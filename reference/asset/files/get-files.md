# Get Files

**Method:** `GET`  
**Path:** `/rest/asset/v1/files.json`  
**Tag:** Files  
**Operation ID:** `getFilesUsingGET`  

Returns the files from the given folder. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `folder` | string | No | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `offset` | integer (int32) | No | Integer offset for paging. Default 0 |  |
| `maxReturn` | integer (int32) | No | Maximum number of files to return. Max 200, default 20 |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/files.json?folder={{folder}}&offset={{offset}}&maxReturn={{maxReturn}}
Accept: application/json
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
