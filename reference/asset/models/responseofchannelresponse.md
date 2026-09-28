# ResponseOfChannelResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`ChannelResponse`](./channelresponse.md) | No |  |  |
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
      "applicableProgramType": "string",
      "createdAt": "2026-01-15T10:30:00Z",
      "id": 123,
      "name": "Example name",
      "progressionStatuses": [
        {
          "description": "string",
          "hidden": true,
          "name": "Example name",
          "type": "string",
          "step": 123,
          "success": true
        }
      ],
      "updatedAt": "2026-01-15T10:30:00Z"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

## Referenced models

- [`ChannelResponse`](./channelresponse.md)
- [`Error`](./error.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
