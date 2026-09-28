# Create Email

**Method:** `POST`  
**Path:** `/rest/asset/v1/emails.json`  
**Tag:** Emails  
**Operation ID:** `createEmailUsingPOST`  

Creates a new email asset. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Request body

**Name:** `createEmailRequest`  
**Required:** Yes  
**Schema:** [`CreateEmailRequest`](../models/createemailrequest.md)

createEmailRequest

#### Generated example

```json
{
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "fromEmail": "person@example.com",
  "fromName": "Example name",
  "name": "Example name",
  "operational": true,
  "replyEmail": "person@example.com",
  "subject": "string",
  "template": 123,
  "textOnly": true,
  "autoCopyToText": true
}
```

### Referenced models

- [`CreateEmailRequest`](../models/createemailrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/emails.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "fromEmail": "person@example.com",
  "fromName": "Example name",
  "name": "Example name",
  "operational": true,
  "replyEmail": "person@example.com",
  "subject": "string",
  "template": 123,
  "textOnly": true,
  "autoCopyToText": true
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfEmailResponse`](../models/responseofemailresponse.md)

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
      "fromEmail": {
        "type": "string",
        "value": "string"
      },
      "fromName": {
        "type": "string",
        "value": "string"
      },
      "id": 123,
      "name": "Example name",
      "operational": true,
      "publishToMSI": true,
      "replyEmail": {
        "type": "string",
        "value": "string"
      },
      "status": "string",
      "subject": {
        "type": "string",
        "value": "string"
      },
      "template": 123,
      "textOnly": true,
      "updatedAt": "2026-01-15T10:30:00Z",
      "url": "https://example.com",
      "version": 1,
      "webView": true,
      "workspace": "string",
      "autoCopyToText": true,
      "preHeader": "string",
      "ccFields": [
        {
          "attributeId": "123",
          "objectName": "Example name",
          "displayName": "Example name",
          "apiName": "Example name"
        }
      ]
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfEmailResponse`](../models/responseofemailresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
