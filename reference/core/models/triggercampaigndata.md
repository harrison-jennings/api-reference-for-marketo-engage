# TriggerCampaignData

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `leads` | array of [`InputLead`](./inputlead.md) | Yes | List of leads for input |  |
| `tokens` | array of [`Token`](./token.md) | No | List of my tokens to replace during the run of the target campaign. The tokens must be available in a parent program or folder to be replaced during the run |  |

## Generated example

```json
{
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
```

## Referenced models

- [`InputLead`](./inputlead.md)
- [`Token`](./token.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
