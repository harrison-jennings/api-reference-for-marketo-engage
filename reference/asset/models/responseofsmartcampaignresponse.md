# ResponseOfSmartCampaignResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`SmartCampaignResponse`](./smartcampaignresponse.md) | No |  |  |
| `success` | boolean | No |  |  |
| `warnings` | array of string | No |  |  |

## Generated example

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

## Referenced models

- [`Error`](./error.md)
- [`SmartCampaignResponse`](./smartcampaignresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
