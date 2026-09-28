# Create Smart Campaign

**Method:** `POST`  
**Path:** `/rest/asset/v1/smartCampaigns.json`  
**Tag:** Smart Campaigns  
**Operation ID:** `createSmartCampaignUsingPOST`  

Creates a new smart campaign. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Request body

**Name:** `createSmartCampaignRequest`  
**Required:** Yes  
**Schema:** [`CreateSmartCampaignRequest`](../models/createsmartcampaignrequest.md)

createSmartCampaignRequest

#### Generated example

```json
{
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "name": "Example name"
}
```

### Referenced models

- [`CreateSmartCampaignRequest`](../models/createsmartcampaignrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/smartCampaigns.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "name": "Example name"
}
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
