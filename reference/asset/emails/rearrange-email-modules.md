# Rearrange Email Modules

**Method:** `POST`  
**Path:** `/rest/asset/v1/email/{id}/content/rearrange.json`  
**Tag:** Emails  
**Operation ID:** `rearrangeModulesUsingPOST`  

Rearranges the modules in an email. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `positions`  
**Required:** No  
**Schema:** string

JSON array of module positions. Each position must be a JSON object with members 'index' and a 'moduleId'

#### Generated example

```json
"string"
```

### Example request

```http
POST {{base_url}}/rest/asset/v1/email/{{id}}/content/rearrange.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

string
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfEmailModuleResponse`](../models/responseofemailmoduleresponse.md)

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

- [`ResponseOfEmailModuleResponse`](../models/responseofemailmoduleresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
