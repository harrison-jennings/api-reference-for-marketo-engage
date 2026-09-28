# SmartCampaignResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the smart campaign (system managed) |  |
| `name` | string | Yes | Name of the smart campaign |  |
| `description` | string | Yes | Description of the smart campaign |  |
| `type` | string | Yes | Type of the smart campaign. Batch: has at least one filter and no triggers. Trigger: has at least one trigger. Default: has no smart list rules | enum: batch, default, trigger |
| `isSystem` | boolean | Yes | Whether smart campaign is system managed. Defaults to false |  |
| `isActive` | boolean | Yes | Whether smart campaign is active. Defaults to false |  |
| `isRequestable` | boolean | Yes | Whether smart campaign is requestable (is active and contains 'Campaign is Requested' trigger with Source of 'Web Service API'). Defaults to false |  |
| `recurrence` | [`Recurrence`](./recurrence.md) | Yes | Recurrence schedule of batch smart campaign |  |
| `qualificationRuleType` | string | Yes | Type of qualification rule. Defaults to 'once' | enum: once, any, interval |
| `qualificationRuleInterval` | integer | Yes | Interval of qualification rule. Only set when qualificationRuleType is 'interval' |  |
| `qualificationRuleUnit` | string | Yes | Unit of measure of qualification rule. Only set when qualificationRuleType is 'interval' | enum: hour, day, week, month |
| `maxMembers` | integer (int32) | Yes | Smart campaign membership limit |  |
| `isCommunicationLimitEnabled` | boolean | Yes | Whether smart campaign communication limit is enabled (i.e. block non-operational emails). Defaults to false |  |
| `smartListId` | integer (int32) | Yes | Id of the smart campaign's child smart list |  |
| `flowId` | integer (int32) | Yes | Id of the smart campaign's child flow |  |
| `parentProgramId` | integer (int32) | No | Parent program Id. Present if smart campaign is under program or nested folder |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `createdAt` | string (date-time) | Yes | Datetime when the smart campaign was created |  |
| `updatedAt` | string (date-time) | Yes | Datetime when the smart campaign was most recently updated |  |
| `workspace` | string | Yes | Name of the smart campaign workspace |  |
| `computedUrl` | string | No | URL to asset in Marketo Engage |  |
| `status` | string | Yes | Status of smart campaign | enum: Inactive, Single Run, Invalid, Recurring Run, Active, Requested, Never Run |

## Generated example

```json
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
```

## Referenced models

- [`Folder`](./folder.md)
- [`Recurrence`](./recurrence.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
