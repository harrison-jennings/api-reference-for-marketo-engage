# Get Smart Campaigns

**Method:** `GET`  
**Path:** `/rest/asset/v1/smartCampaigns.json`  
**Tag:** Smart Campaigns  
**Operation ID:** `getAllSmartCampaignsGET`  

Retrieves all smart campaigns. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `maxReturn` | integer (int32) | No | Maximum number of smart campaigns to return. Max 200, default 20 |  |
| `offset` | integer (int32) | No | Integer offset for paging |  |
| `folder` | string | No | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `earliestUpdatedAt` | string | No | Exclude smart campaigns prior to this date. Must be valid ISO-8601 string. See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |
| `latestUpdatedAt` | string | No | Exclude smart campaigns after this date. Must be valid ISO-8601 string. See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |
| `isActive` | boolean | No | Set true to return only active campaigns. Default false |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/smartCampaigns.json?maxReturn={{maxReturn}}&offset={{offset}}&folder={{folder}}&earliestUpdatedAt={{earliestUpdatedAt}}&latestUpdatedAt={{latestUpdatedAt}}&isActive={{isActive}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSmartCampaignResponse`](../models/responseofsmartcampaignresponse.md)

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
      "description": "string",
      "type": "batch",
      "isSystem": true,
      "isActive": true,
      "isRequestable": true,
      "recurrence": {
        "startAt": "2026-01-15T10:30:00Z",
        "endAt": "2026-01-15T10:30:00Z",
        "intervalType": "Daily",
        "interval": 123,
        "weekdayOnly": true,
        "weekdayMask": [
          "string"
        ],
        "dayOfMonth": 123,
        "dayOfWeek": "Monday",
        "weekOfMonth": 123
      },
      "qualificationRuleType": "once",
      "qualificationRuleInterval": 123,
      "qualificationRuleUnit": "hour",
      "maxMembers": 123,
      "isCommunicationLimitEnabled": true,
      "smartListId": 123,
      "flowId": 123,
      "parentProgramId": 123,
      "folder": {
        "id": 123,
        "type": "Folder"
      },
      "createdAt": "2026-01-15T10:30:00Z",
      "updatedAt": "2026-01-15T10:30:00Z",
      "workspace": "string",
      "computedUrl": "https://example.com",
      "status": "Inactive"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfSmartCampaignResponse`](../models/responseofsmartcampaignresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
