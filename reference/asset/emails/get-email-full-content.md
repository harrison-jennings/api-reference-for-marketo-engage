# Get Email Full Content

**Method:** `GET`  
**Path:** `/rest/asset/v1/email/{id}/fullContent.json`  
**Tag:** Emails  
**Operation ID:** `getEmailFullContentUsingGET`  

Returns the serialized HTML version of the email. Required Permissions: Read-Only Assets, Read-Write Assets. If leadId is passed in the request: Read-Only Lead, Read-Write Lead.

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the email |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `status` | string | No | Status filter for draft or approved versions. Defaults to approved if asset is approved, draft if not. | enum: approved, draft |
| `leadId` | integer (int32) | No | The lead id to impersonate. Email is rendered as though it was received by this lead. |  |
| `type` | string | No | Email content type to return. Default is HTML. | enum: Text, HTML |

### Example request

```http
GET {{base_url}}/rest/asset/v1/email/{{id}}/fullContent.json?status=approved&leadId={{leadId}}&type=Text
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfGetEmailFullContentResponse`](../models/responseofgetemailfullcontentresponse.md)

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

- [`ResponseOfGetEmailFullContentResponse`](../models/responseofgetemailfullcontentresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
