# ScheduleCampaignRequest

**Type:** `object`

Record describe how to schedule the campaign

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | [`ScheduleCampaignData`](./schedulecampaigndata.md) | No |  |  |

## Generated example

```json
{
  "input": {
    "cloneToProgramName": "Example name",
    "runAt": "2026-01-15T10:30:00Z",
    "tokens": [
      {
        "name": "Example name",
        "value": "string"
      }
    ]
  }
}
```

## Referenced models

- [`ScheduleCampaignData`](./schedulecampaigndata.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
