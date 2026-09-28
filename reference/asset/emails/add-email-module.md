# Add Email Module

**Method:** `POST`  
**Path:** `/rest/asset/v1/email/{id}/content/{moduleId}/add.json`  
**Tag:** Emails  
**Operation ID:** `addModuleUsingPOST`  

Adds a new module to an email, with the given id. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |
| `moduleId` | string | Yes | moduleId |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of the module |  |
| `index` | integer (int32) | Yes | Index of the module. Determines the order of the module in the email. |  |

### Example request

```http
POST {{base_url}}/rest/asset/v1/email/{{id}}/content/{{moduleId}}/add.json?name={{name}}&index={{index}}
Accept: application/json
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
