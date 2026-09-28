# Create Landing Page Template

**Method:** `POST`  
**Path:** `/rest/asset/v1/landingPageTemplates.json`  
**Tag:** Landing Page Templates  
**Operation ID:** `createLpTemplateUsingPOST`  

Creates a new landing page template. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Request body

**Name:** `createLpTemplateRequest`  
**Required:** Yes  
**Schema:** [`CreateLpTemplateRequest`](../models/createlptemplaterequest.md)

createLpTemplateRequest

#### Generated example

```json
{
  "description": "string",
  "enableMunchkin": true,
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "name": "Example name",
  "templateType": "guided"
}
```

### Referenced models

- [`CreateLpTemplateRequest`](../models/createlptemplaterequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/landingPageTemplates.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "description": "string",
  "enableMunchkin": true,
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "name": "Example name",
  "templateType": "guided"
}
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
