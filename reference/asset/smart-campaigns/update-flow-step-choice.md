# Update Flow Step Choice

**Method:** `POST`  
**Path:** `/rest/asset/v1/smartCampaign/{id}/flow/{stepId}/choice/{choiceId}.json`  
**Tag:** Smart Campaigns  
**Operation ID:** `updateSmartCampaignFlowStepChoiceUsingPOST`  

Updates a flow step choice's condition and attribute values. Required Permissions: Read-Write Assets

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

### Form-data parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `operator` | string | No | Condition operator, for example 'is', 'is not', 'contains' |  |
| `conditionTypeId` | string | No | JSON representation of the attribute tested by the choice condition, with members 'id' and 'type' which may be 'activity' or 'attribute', for example {"id":64,"type":"attribute"}. Applies to non-default choices |  |
| `conditionValues` | string | No | Comma-separated list of condition values, for example San Francisco,Portland |  |
| `attributes` | string | No | JSON object mapping attribute ids to values, for example {"101":"1 day"}. Each key is the activityTypeAttribId of a flow step choice attribute |  |

### Example request

```http
POST {{base_url}}/rest/asset/v1/smartCampaign/{{id}}/flow/{{stepId}}/choice/{{choiceId}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

operator={{operator}}
conditionTypeId={{conditionTypeId}}
conditionValues={{conditionValues}}
attributes={{attributes}}
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
