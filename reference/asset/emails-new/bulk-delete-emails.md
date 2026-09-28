# Bulk Delete Emails

**Method:** `POST`  
**Path:** `/rest/asset/v2/email/bulk/delete`  
**Tag:** Emails (New)  
**Operation ID:** `bulkDeleteUsingPOST_email`  

Deletes multiple email assets by their IDs in a single request. Maximum 20 assets per request. Required Permissions: Read-Write Assets, Access Design Studio, Delete Email.

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

**Name:** `bulkDeleteRequest`  
**Required:** Yes  
**Schema:** [`BulkDeleteRequest`](../models/bulkdeleterequest.md)

bulkDeleteRequest

#### Generated example

```json
{
  "assetIds": [
    "string"
  ],
  "ignoreUsedBy": true
}
```

### Referenced models

- [`BulkDeleteRequest`](../models/bulkdeleterequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v2/email/bulk/delete?access_token={{access_token}}
x-app-type: {{x-app-type}}
Content-Type: application/json
Accept: application/json

{
  "assetIds": [
    "string"
  ],
  "ignoreUsedBy": true
}
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
