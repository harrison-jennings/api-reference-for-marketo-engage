# Delete Email Template

**Method:** `POST`  
**Path:** `/rest/asset/v2/emailtemplate/{id}/delete`  
**Tag:** Email Templates (New)  
**Operation ID:** `deleteContentUsingPOST_emailtemplate`  

Deletes an email template by its ID. Required Permissions: Read-Write Assets, Access Design Studio, Delete Email Template.

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | string | Yes | id |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `access_token` | string | Yes | Token for Authorization |  |

### Header parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `x-app-type` | string | Yes | Application type header | enum: marketo |

### Example request

```http
POST {{base_url}}/rest/asset/v2/emailtemplate/{{id}}/delete?access_token={{access_token}}
x-app-type: marketo
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`DeleteResponse`](../models/deleteresponse.md)

#### Generated example

```json
{
  "success": true,
  "requestId": "123"
}
```

### Referenced models

- [`DeleteResponse`](../models/deleteresponse.md)

### default — Error

**Schema:** [`ErrorResponse`](../models/errorresponse.md)

#### Generated example

```json
{
  "success": true,
  "requestId": "123",
  "errors": [
    {
      "key": "string",
      "message": "string",
      "code": "string",
      "dynamicMessage": "string",
      "type": "string",
      "source": "string",
      "errorMessage": "string",
      "errorPosition": {
        "line": 123,
        "column": 123
      }
    }
  ]
}
```

### Referenced models

- [`ErrorResponse`](../models/errorresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
