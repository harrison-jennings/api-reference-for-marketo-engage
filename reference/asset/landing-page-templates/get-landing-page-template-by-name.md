# Get Landing Page Template by Name

**Method:** `GET`  
**Path:** `/rest/asset/v1/landingPageTemplate/byName.json`  
**Tag:** Landing Page Templates  
**Operation ID:** `getLandingPageTemplateByNameUsingGET`  

Retrieves the landing page template record for the given name. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of the landing page template |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/landingPageTemplate/byName.json?name={{name}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLpTemplateResponse`](../models/responseoflptemplateresponse.md)

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
      "enableMunchkin": true,
      "folder": {
        "id": 123,
        "type": "Folder"
      },
      "id": 123,
      "name": "Example name",
      "status": "string",
      "templateType": "guided",
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

- [`ResponseOfLpTemplateResponse`](../models/responseoflptemplateresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
