# Update Email Dynamic Content Section

**Method:** `POST`  
**Path:** `/rest/asset/v1/email/{id}/dynamicContent/{contentId}.json`  
**Tag:** Emails  
**Operation ID:** `updateEmailDynamicContentUsingPOST`  

Updates dynamic content in the given section. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of email |  |
| `contentId` | string | Yes | Id of email dynamic content section |  |

### Request body

**Name:** `request`  
**Required:** Yes  
**Schema:** [`UpdateEmailDynamicContentRequest`](../models/updateemaildynamiccontentrequest.md)

Content properties

#### Generated example

```json
{
  "altText": "string",
  "externalUrl": "https://example.com",
  "height": 123,
  "image": "string",
  "linkUrl": "https://example.com",
  "overWrite": true,
  "style": "string",
  "type": "Text",
  "value": "string",
  "videoUrl": "https://example.com",
  "width": 123
}
```

### Referenced models

- [`UpdateEmailDynamicContentRequest`](../models/updateemaildynamiccontentrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/email/{{id}}/dynamicContent/{{contentId}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "altText": "string",
  "externalUrl": "https://example.com",
  "height": 123,
  "image": "string",
  "linkUrl": "https://example.com",
  "overWrite": true,
  "style": "string",
  "type": "Text",
  "value": "string",
  "videoUrl": "https://example.com",
  "width": 123
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
