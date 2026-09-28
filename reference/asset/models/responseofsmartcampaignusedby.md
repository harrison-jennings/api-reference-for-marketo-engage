# ResponseOfSmartCampaignUsedBy

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`SmartCampaignUsedBy`](./smartcampaignusedby.md) | No |  |  |
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
      "usedByCount": "string",
      "usedBy": [
        {
          "id": 123,
          "name": "Example name",
          "compType": "string",
          "subType": "string",
          "status": "string",
          "updatedAt": "2026-01-15T10:30:00Z",
          "programId": 123,
          "accessZoneId": 123
        }
      ]
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
- [`SmartCampaignUsedBy`](./smartcampaignusedby.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
