# Get Smart Campaign by Name

**Method:** `GET`  
**Path:** `/rest/asset/v1/smartCampaign/byName.json`  
**Tag:** Smart Campaigns  
**Operation ID:** `getSmartCampaignByNameUsingGET`  

Returns the smart campaign for the given name. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name for the smart campaign |  |
| `includeFlowSteps` | boolean | No | Set to include flow steps in the response. Default true |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/smartCampaign/byName.json?name={{name}}&includeFlowSteps={{includeFlowSteps}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSmartCampaignResponseWithFlow`](../models/responseofsmartcampaignresponsewithflow.md)

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
      "status": "Inactive",
      "flow": {
        "steps": [
          {
            "id": 123,
            "activityTypeId": 123,
            "activityTypeName": "Example name",
            "stepChoice": [
              null
            ]
          }
        ]
      }
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfSmartCampaignResponseWithFlow`](../models/responseofsmartcampaignresponsewithflow.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
