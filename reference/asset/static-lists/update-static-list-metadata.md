# Update Static List Metadata

**Method:** `POST`  
**Path:** `/rest/asset/v1/staticList/{id}.json`  
**Tag:** Static Lists  
**Operation ID:** `updateStaticListUsingPOST`  

Updates the metadata of a static list asset. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of static list to update |  |

### Request body

**Name:** `updateStaticListRequest`  
**Required:** Yes  
**Schema:** [`UpdateStaticListRequest`](../models/updatestaticlistrequest.md)

updateStaticListRequest

#### Generated example

```json
{
  "description": "string",
  "name": "Example name"
}
```

### Referenced models

- [`UpdateStaticListRequest`](../models/updatestaticlistrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/staticList/{{id}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "description": "string",
  "name": "Example name"
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
