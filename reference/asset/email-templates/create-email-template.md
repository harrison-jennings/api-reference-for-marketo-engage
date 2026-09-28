# Create Email Template

**Method:** `POST`  
**Path:** `/rest/asset/v1/emailTemplates.json`  
**Tag:** Email Templates  
**Operation ID:** `createEmailTemplateUsingPOST`  

Creates a new email template. Required Permissions: Read-Write Assets

## Formats

- **Request:** `multipart/form-data`
- **Response:** `application/json`

## Request

### Request body

**Name:** `createEmailTemplateRequest`  
**Required:** Yes  
**Schema:** [`CreateEmailTemplateRequest`](../models/createemailtemplaterequest.md)

createEmailTemplateRequest

#### Generated example

```json
{
  "name": "Example name",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "description": "string",
  "content": "string"
}
```

### Referenced models

- [`CreateEmailTemplateRequest`](../models/createemailtemplaterequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/emailTemplates.json
Content-Type: multipart/form-data
Accept: application/json

{
  "name": "Example name",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "description": "string",
  "content": "string"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfEmailTemplateResponse`](../models/responseofemailtemplateresponse.md)

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
        "type": "Folder"
      },
      "id": 123,
      "name": "Example name",
      "status": "string",
      "updatedAt": "2026-01-15T10:30:00Z",
      "url": "https://example.com",
      "version": 1,
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

- [`ResponseOfEmailTemplateResponse`](../models/responseofemailtemplateresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
