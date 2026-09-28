# Get Channels

**Method:** `GET`  
**Path:** `/rest/asset/v1/channels.json`  
**Tag:** Channels  
**Operation ID:** `getAllChannelsUsingGET`  

Retrieves all channels. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `maxReturn` | integer (int32) | No | Maximum number of records to return. Max 200, default 20 |  |
| `offset` | integer (int32) | No | Integer offset for paging |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/channels.json?maxReturn={{maxReturn}}&offset={{offset}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfChannelResponse`](../models/responseofchannelresponse.md)

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
      "applicableProgramType": "string",
      "createdAt": "2026-01-15T10:30:00Z",
      "id": 123,
      "name": "Example name",
      "progressionStatuses": [
        {
          "description": "string",
          "hidden": true,
          "name": "Example name",
          "type": "string",
          "step": 123,
          "success": true
        }
      ],
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

- [`ResponseOfChannelResponse`](../models/responseofchannelresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
