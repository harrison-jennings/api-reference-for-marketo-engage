# AddFormFieldVisibilityRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `visibilityRule` | [`FormFieldVisibilityRequest`](./formfieldvisibilityrequest.md) | No |  |  |

## Generated example

```json
{
  "visibilityRule": {
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
}
```

## Referenced models

- [`FormFieldVisibilityRequest`](./formfieldvisibilityrequest.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
