# Bulk Get Emails Used By

**Method:** `POST`  
**Path:** `/rest/asset/v2/email/bulk/usedby`  
**Tag:** Emails (New)  
**Operation ID:** `bulkUsedByUsingPOST_email`  

Returns, for each of the specified emails, whether it is used and the number of places it is used (count) — not the referencing assets themselves. Maximum 50 assets per request. Required Permissions: Read-Only Assets, Access Design Studio.

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `access_token` | string | Yes | Token for Authorization |  |

### Header parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `x-app-type` | string | Yes | Application type header |  |

### Request body

**Name:** `bulkUsedByRequest`  
**Required:** Yes  
**Schema:** [`BulkUsedByRequest`](../models/bulkusedbyrequest.md)

bulkUsedByRequest

#### Generated example

```json
{
  "assetIds": [
    "string"
  ]
}
```

### Referenced models

- [`BulkUsedByRequest`](../models/bulkusedbyrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v2/email/bulk/usedby?access_token={{access_token}}
x-app-type: {{x-app-type}}
Content-Type: application/json
Accept: application/json

{
  "assetIds": [
    "string"
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`BulkUsedByResponse`](../models/bulkusedbyresponse.md)

#### Generated example

```json
{
  "success": true,
  "requestId": "123",
  "result": [
    {
      "id": "123",
      "name": "Example name",
      "count": 123,
      "used": true
    }
  ]
}
```

### Referenced models

- [`BulkUsedByResponse`](../models/bulkusedbyresponse.md)

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
