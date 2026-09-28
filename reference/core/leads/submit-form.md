# Submit Form

**Method:** `POST`  
**Path:** `/rest/v1/leads/submitForm.json`  
**Tag:** Leads  
**Operation ID:** `SubmitFormUsingPOST`  

Upserts a lead and generates a "Fill out Form" activity which is associated back to program and/or campaign. Required Permissions: Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `submitFormRequest`  
**Required:** Yes  
**Schema:** [`SubmitFormRequest`](../models/submitformrequest.md)

submitFormRequest

#### Generated example

```json
{
  "input": [
    {
      "leadFormFields": {
        "email": "person@example.com"
      },
      "visitorData": {
        "pageURL": "https://example.com",
        "queryString": "string",
        "leadClientIpAddress": "string",
        "userAgentString": "string"
      },
      "cookie": "string"
    }
  ],
  "formId": 123,
  "programId": 123
}
```

### Referenced models

- [`SubmitFormRequest`](../models/submitformrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/leads/submitForm.json
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "leadFormFields": {
        "email": "person@example.com"
      },
      "visitorData": {
        "pageURL": "https://example.com",
        "queryString": "string",
        "leadClientIpAddress": "string",
        "userAgentString": "string"
      },
      "cookie": "string"
    }
  ],
  "formId": 123,
  "programId": 123
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSubmitForm`](../models/responseofsubmitform.md)

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
      "id": 123,
      "status": "created",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ]
    }
  ],
  "success": false,
  "warnings": [
    {
      "code": 123,
      "message": "string"
    }
  ]
}
```

### Referenced models

- [`ResponseOfSubmitForm`](../models/responseofsubmitform.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
