# LpFormFieldResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `blankFields` | integer (int32) | No |  |  |
| `columnNumber` | integer (int32) | No |  |  |
| `dataType` | string | No |  |  |
| `defaultValue` | string | No |  |  |
| `fieldMetaData` | object | No |  |  |
| `fieldWidth` | integer (int32) | No |  |  |
| `fields` | array of string | No |  |  |
| `formPrefill` | boolean | No |  |  |
| `isSensitive` | boolean | No |  |  |
| `hintText` | string | No |  |  |
| `id` | string | No |  |  |
| `instructions` | string | No |  |  |
| `label` | string | No |  |  |
| `labelWidth` | integer (int32) | No |  |  |
| `maxLength` | integer (int32) | No |  |  |
| `required` | boolean | No |  |  |
| `rowNumber` | integer (int32) | No |  |  |
| `text` | string | No |  |  |
| `validationMessage` | object | No |  |  |
| `visibilityRules` | [`FormFieldVisibilityRuleResponse`](./formfieldvisibilityruleresponse.md) | No |  |  |

## Generated example

```json
{
  "blankFields": 123,
  "columnNumber": 123,
  "dataType": "string",
  "defaultValue": "string",
  "fieldMetaData": {},
  "fieldWidth": 123,
  "fields": [
    "string"
  ],
  "formPrefill": true,
  "isSensitive": true,
  "hintText": "string",
  "id": "123",
  "instructions": "string",
  "label": "string",
  "labelWidth": 123,
  "maxLength": 123,
  "required": true,
  "rowNumber": 123,
  "text": "string",
  "validationMessage": {},
  "visibilityRules": {
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
}
```

## Referenced models

- [`FormFieldVisibilityRuleResponse`](./formfieldvisibilityruleresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
