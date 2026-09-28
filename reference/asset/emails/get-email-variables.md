# Get Email Variables

**Method:** `GET`  
**Path:** `/rest/asset/v1/email/{id}/variables.json`  
**Tag:** Emails  
**Operation ID:** `getEmailVariablesUsingGET`  

Returns a list of the available variables in an email. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/email/{{id}}/variables.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfEmailVariableResponse`](../models/responseofemailvariableresponse.md)

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
      "name": "Example name",
      "value": "string",
      "moduleScope": true,
      "moduleId": "123"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfEmailVariableResponse`](../models/responseofemailvariableresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
