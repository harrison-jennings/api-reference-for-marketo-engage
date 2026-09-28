# Clone Smart List

**Method:** `POST`  
**Path:** `/rest/asset/v1/smartList/{id}/clone.json`  
**Tag:** Smart Lists  
**Operation ID:** `cloneSmartListUsingPOST`  

Clones the designated Smart List. Required Permissions: Read-Write Asset

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of smart list to clone |  |

### Request body

**Name:** `cloneSmartListRequest`  
**Required:** Yes  
**Schema:** [`CloneSmartListRequest`](../models/clonesmartlistrequest.md)

cloneSmartListRequest

#### Generated example

```json
{
  "name": "Example name",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "description": "string"
}
```

### Referenced models

- [`CloneSmartListRequest`](../models/clonesmartlistrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/smartList/{{id}}/clone.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "name": "Example name",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "description": "string"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSmartListResponse`](../models/responseofsmartlistresponse.md)

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

- [`ResponseOfSmartListResponse`](../models/responseofsmartlistresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
