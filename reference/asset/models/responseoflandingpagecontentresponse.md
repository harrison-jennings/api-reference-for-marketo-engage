# ResponseOfLandingPageContentResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`LandingPageContentResponse`](./landingpagecontentresponse.md) | No |  |  |
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
      "content": {},
      "followupType": "url",
      "followupValue": "string",
      "formattingOptions": {
        "array": true,
        "bigDecimal": true,
        "bigInteger": true,
        "binary": true,
        "boolean": true,
        "containerNode": true,
        "double": true,
        "float": true,
        "floatingPointNumber": true,
        "int": true,
        "integralNumber": true,
        "long": true,
        "missingNode": true,
        "nodeType": "ARRAY",
        "null": true,
        "number": true,
        "object": true,
        "pojo": true,
        "short": true,
        "textual": true,
        "valueNode": true
      },
      "id": {},
      "index": 123,
      "type": "Image"
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
- [`LandingPageContentResponse`](./landingpagecontentresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
