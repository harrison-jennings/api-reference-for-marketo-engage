# Update Email Content

**Method:** `POST`  
**Path:** `/rest/asset/v1/email/{id}/content.json`  
**Tag:** Emails  
**Operation ID:** `updateEmailContentUsingPOST`  

Updates the content of an email. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `updateEmailRequest`  
**Required:** Yes  
**Schema:** [`UpdateEmailComponentDataRequest`](../models/updateemailcomponentdatarequest.md)

updateEmailRequest

#### Generated example

```json
{
  "fromEmail": {
    "type": "string",
    "value": "string"
  },
  "fromName": {
    "type": "string",
    "value": "string"
  },
  "replyTO": {
    "type": "string",
    "value": "string"
  },
  "subject": {
    "type": "string",
    "value": "string"
  }
}
```

### Referenced models

- [`UpdateEmailComponentDataRequest`](../models/updateemailcomponentdatarequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/email/{{id}}/content.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "fromEmail": {
    "type": "string",
    "value": "string"
  },
  "fromName": {
    "type": "string",
    "value": "string"
  },
  "replyTO": {
    "type": "string",
    "value": "string"
  },
  "subject": {
    "type": "string",
    "value": "string"
  }
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
