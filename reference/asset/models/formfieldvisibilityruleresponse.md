# FormFieldVisibilityRuleResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `ruleType` | string | No |  |  |
| `rules` | array of [`FormVisibilityRuleDTO`](./formvisibilityruledto.md) | No |  |  |

## Generated example

```json
{
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
```

## Referenced models

- [`FormVisibilityRuleDTO`](./formvisibilityruledto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
