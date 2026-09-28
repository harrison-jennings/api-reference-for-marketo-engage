# ResponseOfAutoSuggestValue

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of array of [`AutoSuggestValue`](./autosuggestvalue.md) | No | One array of suggested values |  |
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
    [
      {
        "id": 123,
        "displayName": "Example name",
        "name": "Example name",
        "workspace": "string",
        "workspaceId": 123
      }
    ]
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

## Referenced models

- [`AutoSuggestValue`](./autosuggestvalue.md)
- [`Error`](./error.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
