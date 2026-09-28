# Update Email Content Section

**Method:** `POST`  
**Path:** `/rest/asset/v1/email/{id}/content/{htmlId}.json`  
**Tag:** Emails  
**Operation ID:** `updateEmailComponentContentUsingPOST`  

Updates the content in the given section. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |
| `htmlId` | string | Yes | htmlId |  |

### Request body

**Name:** `request`  
**Required:** Yes  
**Schema:** [`UpdateEmailComponentContentRequest`](../models/updateemailcomponentcontentrequest.md)

request

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
  "textValue": "string",
  "type": "Text",
  "value": "string",
  "videoUrl": "https://example.com",
  "width": 123
}
```

### Referenced models

- [`UpdateEmailComponentContentRequest`](../models/updateemailcomponentcontentrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/email/{{id}}/content/{{htmlId}}.json
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
  "textValue": "string",
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
