# Get Email by Name

**Method:** `GET`  
**Path:** `/rest/asset/v1/email/byName.json`  
**Tag:** Emails  
**Operation ID:** `getEmailByNameUsingGET`  

Returns email records based on the given name. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of the email |  |
| `status` | string | No | Status filter for draft or approved versions | enum: approved, draft |
| `folder` | string | No | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/email/byName.json?name={{name}}&status=approved&folder={{folder}}
Accept: application/json
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
