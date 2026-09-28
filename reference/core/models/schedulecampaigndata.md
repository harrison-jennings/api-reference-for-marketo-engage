# ScheduleCampaignData

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `cloneToProgramName` | string | No | Name of the resulting program. When set, this attribute will cause the campaign, parent program, and all of its assets, to be created with the resulting new name. The parent program will be cloned and the newly created campaign will be scheduled. The resulting program is created underneath the parent. Programs with snippets, push notifications, in-app messages, static lists, reports, and social assets may not be cloned in this way |  |
| `runAt` | string (date-time) | No | Datetime to run the campaign at. If unset, the campaign will be run five minutes after the call is made |  |
| `tokens` | array of [`Token`](./token.md) | No | List of my tokens to replace during the run of the target campaign. The tokens must be available in a parent program or folder to be replaced during the run |  |

## Generated example

```json
{
  "cloneToProgramName": "Example name",
  "runAt": "2026-01-15T10:30:00Z",
  "tokens": [
    {
      "name": "Example name",
      "value": "string"
    }
  ]
}
```

## Referenced models

- [`Token`](./token.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
