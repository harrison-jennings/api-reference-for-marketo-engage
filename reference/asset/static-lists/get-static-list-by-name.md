# Get Static List by Name

**Method:** `GET`  
**Path:** `/rest/asset/v1/staticList/byName.json`  
**Tag:** Static Lists  
**Operation ID:** `getStaticListByNameUsingGET`  

Retrieves a Static List record by its name. Required Permissions: Read-Asset or Read-Write Asset

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of static list to retrieve |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/staticList/byName.json?name={{name}}
Accept: application/json
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
