# Get Email CC Fields

**Method:** `GET`  
**Path:** `/rest/asset/v1/email/ccFields.json`  
**Tag:** Emails  
**Operation ID:** `getEmailCCFieldsUsingGET`  

Returns the set of fields enabled for Email CC in the target instance. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/asset/v1/email/ccFields.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfEmailCCFieldsResponse`](../models/responseofemailccfieldsresponse.md)

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
      "attributeId": "123",
      "objectName": "Example name",
      "displayName": "Example name",
      "apiName": "Example name"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfEmailCCFieldsResponse`](../models/responseofemailccfieldsresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
