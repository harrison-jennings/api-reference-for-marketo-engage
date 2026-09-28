# Create Static List

**Method:** `POST`  
**Path:** `/rest/asset/v1/staticLists.json`  
**Tag:** Static Lists  
**Operation ID:** `createStaticListUsingPOST`  

Creates a new Static List. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Request body

**Name:** `createStaticListRequest`  
**Required:** Yes  
**Schema:** [`CreateStaticListRequest`](../models/createstaticlistrequest.md)

createStaticListRequest

#### Generated example

```json
{
  "description": "string",
  "name": "Example name",
  "folder": {
    "id": 123,
    "type": "Folder"
  }
}
```

### Referenced models

- [`CreateStaticListRequest`](../models/createstaticlistrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/staticLists.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "description": "string",
  "name": "Example name",
  "folder": {
    "id": 123,
    "type": "Folder"
  }
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfStaticListResponse`](../models/responseofstaticlistresponse.md)

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
      "id": 123,
      "name": "Example name",
      "description": "string",
      "createdAt": "2026-01-15T10:30:00Z",
      "updatedAt": "2026-01-15T10:30:00Z",
      "url": "https://example.com",
      "folder": {
        "id": 123,
        "type": "Folder"
      },
      "workspace": "string",
      "computedUrl": "https://example.com"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfStaticListResponse`](../models/responseofstaticlistresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
