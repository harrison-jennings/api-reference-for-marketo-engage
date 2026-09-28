# Update Email Full Content

**Method:** `POST`  
**Path:** `/rest/asset/v1/email/{id}/fullContent.json`  
**Tag:** Emails  
**Operation ID:** `createEmailFullContentUsingPOST`  

Replaces the HTML of an Email that has had its relationship broken from its template. Required Permissions: Read-Write Assets

## Formats

- **Request:** `multipart/form-data`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the email |  |

### Request body

**Name:** `updateEmailFullContentRequest`  
**Required:** Yes  
**Schema:** [`UpdateEmailFullContentRequest`](../models/updateemailfullcontentrequest.md)

Content is multipart file parameter

#### Generated example

```json
{
  "content": "string"
}
```

### Referenced models

- [`UpdateEmailFullContentRequest`](../models/updateemailfullcontentrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/email/{{id}}/fullContent.json
Content-Type: multipart/form-data
Accept: application/json

{
  "content": "string"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfUpdateEmailFullContentResponse`](../models/responseofupdateemailfullcontentresponse.md)

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

- [`ResponseOfUpdateEmailFullContentResponse`](../models/responseofupdateemailfullcontentresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
