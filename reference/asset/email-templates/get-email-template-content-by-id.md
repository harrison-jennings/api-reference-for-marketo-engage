# Get Email Template Content by Id

**Method:** `GET`  
**Path:** `/rest/asset/v1/emailTemplate/{id}/content`  
**Tag:** Email Templates  
**Operation ID:** `getTemplateContentByIdUsingGET`  

Returns the content for a given email template. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `status` | string | No | Status filter for draft or approved versions | enum: approved, draft |

### Example request

```http
GET {{base_url}}/rest/asset/v1/emailTemplate/{{id}}/content?status=approved
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfEmailTemplateContentResponse`](../models/responseofemailtemplatecontentresponse.md)

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
      "content": "string",
      "id": 123,
      "status": "approved"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfEmailTemplateContentResponse`](../models/responseofemailtemplatecontentresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
