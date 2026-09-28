# ResponseOfLandingPageRedirectRules

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`LandingPageRedirectRule`](./landingpageredirectrule.md) | No |  |  |
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
      "redirectFromUrl": "https://example.com",
      "redirectToUrl": "https://example.com",
      "hostname": "Example name",
      "redirectFrom": {
        "type": "landingPageId",
        "value": "string"
      },
      "redirectTo": {
        "type": "landingPageId",
        "value": "string"
      },
      "createdAt": "2026-01-15T10:30:00Z",
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
- [`LandingPageRedirectRule`](./landingpageredirectrule.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
