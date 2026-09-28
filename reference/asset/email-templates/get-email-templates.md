# Get Email Templates

**Method:** `GET`  
**Path:** `/rest/asset/v1/emailTemplates.json`  
**Tag:** Email Templates  
**Operation ID:** `getEmailTemplatesUsingGET`  

Returns a list of email template records accessible in the target instance. Required Permissions: Read-Only Assets, Read-Write Assets.

Note: Email templates created with the new email designer may appear in this API's response, but some of the fields may be null or incomplete. For complete and reliable details of these assets, use the Email Templates (New) APIs; refer to the <a href="https://developer.adobe.com/marketo-apis/api/asset#operation/filterContentUsingGET_emailtemplate">List Email Templates</a> endpoint.

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `offset` | integer (int32) | No | Integer offset for paging |  |
| `maxReturn` | integer (int32) | No | Maximum number of records to return. Max 200, default 20 |  |
| `status` | string | No | Status filter for draft or approved versions | enum: approved, draft |

### Example request

```http
GET {{base_url}}/rest/asset/v1/emailTemplates.json?offset={{offset}}&maxReturn={{maxReturn}}&status=approved
Accept: application/json
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
