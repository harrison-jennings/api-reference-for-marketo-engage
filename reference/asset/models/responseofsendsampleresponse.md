# ResponseOfSendSampleResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`SendSampleResponse`](./sendsampleresponse.md) | No |  |  |
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
      "service": "sendTestEmail",
      "result": true
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
- [`SendSampleResponse`](./sendsampleresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
