# UpdateProgramRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `channel` | string | No | Channel of the program. The channel must be valid for the program's type. Updating the channel keeps Program Settings Channel and the Channel tag in sync. If a Channel tag is also passed in tags, the channel value takes precedence. The update is rejected with error code 1173 if a child campaign uses a Change Program Status flow step. |  |
| `costs` | array of [`CostRequest`](./costrequest.md) | No | Lists of associated period costs that allow you to append, replace, or delete. To append new costs, simply add them to costs array. To replace costs (destructive update), pass new costs and set costsDestructiveUpdate to true. To delete costs, do not pass costs parameter and set costsDestructiveUpdate to true |  |
| `costsDestructiveUpdate` | boolean | No | Set true to destroy existing costs and replace them with the specified costs |  |
| `description` | string | No | Updated description for the program |  |
| `endDate` | string | No | End date of the program. Applicable to event, email, and webinar type programs |  |
| `name` | string | No | Name of the program |  |
| `startDate` | string | No | Start date of program. Applicable to event, email and webinar type programs |  |
| `tags` | array of [`TagRequest`](./tagrequest.md) | No | List of associated program tags |  |

## Generated example

```json
{
  "channel": "string",
  "costs": [
    {
      "cost": 123,
      "note": "string",
      "startDate": "2026-01-15T10:30:00Z"
    }
  ],
  "costsDestructiveUpdate": true,
  "description": "string",
  "endDate": "string",
  "name": "Example name",
  "startDate": "string",
  "tags": [
    {
      "tagType": "string",
      "tagValue": "string"
    }
  ]
}
```

## Referenced models

- [`CostRequest`](./costrequest.md)
- [`TagRequest`](./tagrequest.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
