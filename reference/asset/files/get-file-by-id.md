# Get File by Id

**Method:** `GET`  
**Path:** `/rest/asset/v1/file/{id}.json`  
**Tag:** Files  
**Operation ID:** `getFileByIdUsingGET`  

Returns the file record for the given id. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id for file in database |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/file/{{id}}.json
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
