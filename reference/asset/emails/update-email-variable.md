# Update Email Variable

**Method:** `POST`  
**Path:** `/rest/asset/v1/email/{id}/variable/{name}.json`  
**Tag:** Emails  
**Operation ID:** `updateVariableUsingPOST`  

Updates the value of a given variable in an email. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |
| `name` | string | Yes | name |  |

### Request body

**Name:** `updateVariableRequest`  
**Required:** No  
**Schema:** [`UpdateVariableRequest`](../models/updatevariablerequest.md)

updateVariableRequest

#### Generated example

```json
{
  "value": "string",
  "moduleId": "123"
}
```

### Referenced models

- [`UpdateVariableRequest`](../models/updatevariablerequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/email/{{id}}/variable/{{name}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "value": "string",
  "moduleId": "123"
}
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
