# TriggerCampaignRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | [`TriggerCampaignData`](./triggercampaigndata.md) | Yes | Object describing trigger configuration for the campaign |  |

## Generated example

```json
{
  "input": {
    "leads": [
      {
        "id": 123
      }
    ],
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

- [`TriggerCampaignData`](./triggercampaigndata.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
