# Get Form Used By

**Method:** `GET`  
**Path:** `/rest/asset/v1/form/{id}/usedBy.json`  
**Tag:** Forms  
**Operation ID:** `getFormUsedByUsingGET`  

Returns a list of asset records which depend on a given form. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the form |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `offset` | integer (int32) | No | Integer offset for paging |  |
| `maxReturn` | integer (int32) | No | Maximum number of assets to return. Max 200, default 20 |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/form/{{id}}/usedBy.json?offset={{offset}}&maxReturn={{maxReturn}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfFormUsedByResponse`](../models/responseofformusedbyresponse.md)

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
      "name": "Example name",
      "type": "string",
      "status": "approved",
      "updatedAt": "2026-01-15T10:30:00Z"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfFormUsedByResponse`](../models/responseofformusedbyresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
