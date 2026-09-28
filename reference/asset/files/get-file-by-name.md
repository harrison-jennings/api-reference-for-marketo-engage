# Get File by Name

**Method:** `GET`  
**Path:** `/rest/asset/v1/file/byName.json`  
**Tag:** Files  
**Operation ID:** `getFileByNameUsingGET`  

Returns files records for the given name. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of the file |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/file/byName.json?name={{name}}
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
