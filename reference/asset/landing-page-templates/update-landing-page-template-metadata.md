# Update Landing Page Template Metadata

**Method:** `POST`  
**Path:** `/rest/asset/v1/landingPageTemplate/{id}.json`  
**Tag:** Landing Page Templates  
**Operation ID:** `updateLpTemplateUsingPOST`  

Updates the metadata for the target landing page template. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `updateLpTemplateRequest`  
**Required:** Yes  
**Schema:** [`UpdateLpTemplateRequest`](../models/updatelptemplaterequest.md)

updateLpTemplateRequest

#### Generated example

```json
{
  "description": "string",
  "enableMunchkin": true,
  "name": "Example name"
}
```

### Referenced models

- [`UpdateLpTemplateRequest`](../models/updatelptemplaterequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/landingPageTemplate/{{id}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "description": "string",
  "enableMunchkin": true,
  "name": "Example name"
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
