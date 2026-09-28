# Get Landing Page Templates

**Method:** `GET`  
**Path:** `/rest/asset/v1/landingPageTemplates.json`  
**Tag:** Landing Page Templates  
**Operation ID:** `getLandingPageTemplatesUsingGET`  

Retrieves the list of accessible landing page templates from the target instance. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `maxReturn` | integer (int32) | No | Maximum number of records to return. Max 200, default 20 |  |
| `offset` | integer (int32) | No | Integer offset for paging |  |
| `status` | string | No | Status filter for draft or approved versions | enum: approved, draft |
| `folder` | string | No | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/landingPageTemplates.json?maxReturn={{maxReturn}}&offset={{offset}}&status=approved&folder={{folder}}
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
