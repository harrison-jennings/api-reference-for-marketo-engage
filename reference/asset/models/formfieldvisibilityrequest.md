# FormFieldVisibilityRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `ruleType` | string | Yes | Type of rule to apply | enum: show, alwaysShow, hide |
| `rules` | array of [`VisibilityRuleRequest`](./visibilityrulerequest.md) | Yes | JSON Array of rules |  |

## Generated example

```json
{
  "ruleType": "show",
  "rules": [
    {
      "altLabel": "string",
      "operator": "is",
      "pickListValues": [
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

- [`VisibilityRuleRequest`](./visibilityrulerequest.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
