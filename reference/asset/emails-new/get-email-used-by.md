# Get Email Used By

**Method:** `POST`  
**Path:** `/rest/asset/v2/email/usedby`  
**Tag:** Emails (New)  
**Operation ID:** `getContentUsedByUsingPOST_email`  

Returns a list of assets that reference the specified email. Required Permissions: Read-Only Assets, Access Design Studio.

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
| `x-app-type` | string | Yes | Application type header | enum: marketo |

### Request body

**Name:** `usedByRequest`  
**Required:** Yes  
**Schema:** [`UsedByRequestDto`](../models/usedbyrequestdto.md)

usedByRequest

#### Generated example

```json
{
  "assetId": "123",
  "pageIndex": 123,
  "pageSize": 123,
  "type": "string"
}
```

### Referenced models

- [`UsedByRequestDto`](../models/usedbyrequestdto.md)

### Example request

```http
POST {{base_url}}/rest/asset/v2/email/usedby?access_token={{access_token}}
x-app-type: marketo
Content-Type: application/json
Accept: application/json

{
  "assetId": "123",
  "pageIndex": 123,
  "pageSize": 123,
  "type": "string"
}
```

## Responses

### 200 — OK

**Schema:** [`UsedByResponse`](../models/usedbyresponse.md)

#### Generated example

```json
{
  "success": true,
  "requestId": "123",
  "result": [
    {
      "id": "123",
      "name": "Example name",
      "appData": {
        "editorType": "string",
        "folderId": "123",
        "workspaceId": "123"
      },
      "channel": "string",
      "contentType": "string",
      "externalId": "123"
    }
  ],
  "pageDetails": {
    "totalItems": 123,
    "pageSize": 123,
    "currentPage": 123
  }
}
```

### Referenced models

- [`UsedByResponse`](../models/usedbyresponse.md)

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
