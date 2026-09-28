# ResponseOfLandingPageDynamicContentResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`LandingPageDynamicContentResponse`](./landingpagedynamiccontentresponse.md) | No |  |  |
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
      "content": [
        {
          "content": {},
          "followupType": "string",
          "followupValue": "string",
          "segmentId": 123,
          "segmentName": "Example name",
          "type": "string"
        }
      ],
      "createdAt": "2026-01-15T10:30:00Z",
      "id": 123,
      "segmentation": 123,
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

- [`Error`](./error.md)
- [`LandingPageDynamicContentResponse`](./landingpagedynamiccontentresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
