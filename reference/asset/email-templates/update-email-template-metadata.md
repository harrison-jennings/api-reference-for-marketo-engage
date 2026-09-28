# Update Email Template Metadata

**Method:** `POST`  
**Path:** `/rest/asset/v1/emailTemplate/{id}.json`  
**Tag:** Email Templates  
**Operation ID:** `updateEmailTemplateUsingPOST`  

Updates the metadata for the designated email template. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `updateEmailMetaDataRequest`  
**Required:** Yes  
**Schema:** [`UpdateEmailTemplateMetaDataRequest`](../models/updateemailtemplatemetadatarequest.md)

updateEmailMetaDataRequest

#### Generated example

```json
{
  "description": "string",
  "name": "Example name"
}
```

### Referenced models

- [`UpdateEmailTemplateMetaDataRequest`](../models/updateemailtemplatemetadatarequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/emailTemplate/{{id}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "description": "string",
  "name": "Example name"
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
