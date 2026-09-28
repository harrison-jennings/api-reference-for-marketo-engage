# Get Smart Campaign Used By

**Method:** `GET`  
**Path:** `/rest/asset/v1/smartCampaign/{id}/usedBy.json`  
**Tag:** Smart Campaigns  
**Operation ID:** `getSmartCampaignUsedByUsingGET`  

Returns a list of assets that reference the specified smart campaign. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the smart campaign |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `offset` | integer (int32) | No | Integer offset for paging |  |
| `maxReturn` | integer (int32) | No | Maximum number of results to return. Max 50, default 50 |  |
| `sortByColumn` | string | No | Column to sort results by. Default updated_at | enum: updatedAt, name, updated_at |
| `order` | string | No | Sort order. Default desc | enum: asc, desc |
| `query` | string | No | Filter results by name |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/smartCampaign/{{id}}/usedBy.json?offset={{offset}}&maxReturn={{maxReturn}}&sortByColumn=updatedAt&order=asc&query={{query}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSmartCampaignUsedBy`](../models/responseofsmartcampaignusedby.md)

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
      "usedByCount": "string",
      "usedBy": [
        {
          "id": 123,
          "name": "Example name",
          "compType": "string",
          "subType": "string",
          "status": "string",
          "updatedAt": "2026-01-15T10:30:00Z",
          "programId": 123,
          "accessZoneId": 123
        }
      ]
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfSmartCampaignUsedBy`](../models/responseofsmartcampaignusedby.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
