# ResponseOfSmartListRuleType

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`SmartListRuleTypes`](./smartlistruletypes.md) | No |  |  |
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
      "filters": [
        {
          "id": 123,
          "name": "Example name",
          "type": "activity",
          "constraints": [
            {
              "id": 123,
              "name": "Example name",
              "dataType": "string",
              "primary": true,
              "operator": "string",
              "dbAttrib": true,
              "dbAttribId": "123",
              "dbObject": "string",
              "type": "string"
            }
          ]
        }
      ],
      "predictiveFilters": {}
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
- [`SmartListRuleTypes`](./smartlistruletypes.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
