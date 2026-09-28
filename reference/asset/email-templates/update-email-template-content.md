# Update Email Template Content

**Method:** `POST`  
**Path:** `/rest/asset/v1/emailTemplate/{id}/content.json`  
**Tag:** Email Templates  
**Operation ID:** `updateEmailTemplateContentUsingPOST`  

Updates the content of the given email template. Required Permissions: Read-Write Assets

## Formats

- **Request:** `multipart/form-data`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `updateEmailTemplateContentRequest`  
**Required:** No  
**Schema:** [`UpdateEmailTemplateContentRequest`](../models/updateemailtemplatecontentrequest.md)

updateEmailTemplateContentRequest

#### Generated example

```json
{
  "content": "string"
}
```

### Referenced models

- [`UpdateEmailTemplateContentRequest`](../models/updateemailtemplatecontentrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/emailTemplate/{{id}}/content.json
Content-Type: multipart/form-data
Accept: application/json

{
  "content": "string"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfIdResponse`](../models/responseofidresponse.md)

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
      "id": 123
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfIdResponse`](../models/responseofidresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
