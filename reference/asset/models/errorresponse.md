# ErrorResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `success` | boolean | No |  |  |
| `requestId` | string | No |  |  |
| `errors` | array of [`ContentWaveErrorDTO`](./contentwaveerrordto.md) | No |  |  |

## Generated example

```json
{
  "success": true,
  "requestId": "123",
  "errors": [
    {
      "key": "string",
      "message": "string",
      "code": "string",
      "dynamicMessage": "string",
      "type": "string",
      "source": "string",
      "errorMessage": "string",
      "errorPosition": {
        "line": 123,
        "column": 123
      }
    }
  ]
}
```

## Referenced models

- [`ContentWaveErrorDTO`](./contentwaveerrordto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
