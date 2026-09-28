# ResponseOfFormVisibilityRuleResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`FormVisibilityRuleResponse`](./formvisibilityruleresponse.md) | No |  |  |
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
      "formFieldId": "123",
      "ruleType": "string",
      "rules": [
        {
          "altLabel": "string",
          "operator": "string",
          "picklistFilterValues": [
            {
              "isDefault": true,
              "label": "string",
              "selected": true,
              "value": "string"
            }
          ],
          "subjectField": "string",
          "values": [
            "string"
          ]
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
- [`FormVisibilityRuleResponse`](./formvisibilityruleresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
