# Send Sample Email

**Method:** `POST`  
**Path:** `/rest/asset/v1/email/{id}/sendSample.json`  
**Tag:** Emails  
**Operation ID:** `sendSampleEmailUsingPOST`  

Sends a sample email to the given email address. Leads may be impersonated to populate data for tokens and dynamic content. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the email |  |

### Request body

**Name:** `sendSampleEmailRequest`  
**Required:** Yes  
**Schema:** [`SendSampleEmailRequest`](../models/sendsampleemailrequest.md)

sendSampleEmailRequest

#### Generated example

```json
{
  "emailAddress": "person@example.com",
  "leadId": "123",
  "textOnly": true
}
```

### Referenced models

- [`SendSampleEmailRequest`](../models/sendsampleemailrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/email/{{id}}/sendSample.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "emailAddress": "person@example.com",
  "leadId": "123",
  "textOnly": true
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSendSampleResponse`](../models/responseofsendsampleresponse.md)

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
      "service": "sendTestEmail",
      "result": true
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfSendSampleResponse`](../models/responseofsendsampleresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
