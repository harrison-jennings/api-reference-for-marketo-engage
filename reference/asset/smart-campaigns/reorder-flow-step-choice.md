# Reorder Flow Step Choice

**Method:** `POST`  
**Path:** `/rest/asset/v1/smartCampaign/{id}/flow/{stepId}/choice/{choiceId}/reorder.json`  
**Tag:** Smart Campaigns  
**Operation ID:** `reorderSmartCampaignFlowStepChoiceUsingPOST`  

Moves a choice to a new position within a flow step. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the smart campaign |  |
| `stepId` | integer (int32) | Yes | Id of the flow step |  |
| `choiceId` | integer (int32) | Yes | Id of the flow step choice |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `newSeqNumZeroBased` | integer (int32) | Yes | New 0-based position for the choice. Must be non-negative |  |

### Example request

```http
POST {{base_url}}/rest/asset/v1/smartCampaign/{{id}}/flow/{{stepId}}/choice/{{choiceId}}/reorder.json?newSeqNumZeroBased={{newSeqNumZeroBased}}
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
