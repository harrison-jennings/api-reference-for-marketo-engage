# Get Smart List by Name

**Method:** `GET`  
**Path:** `/rest/asset/v1/smartList/byName.json`  
**Tag:** Smart Lists  
**Operation ID:** `getSmartListByNameUsingGET`  

Retrieves a Smart List record by its name. Required Permissions: Read-Asset or Read-Write Asset

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of smart list to retrieve |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/smartList/byName.json?name={{name}}
Accept: application/json
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
