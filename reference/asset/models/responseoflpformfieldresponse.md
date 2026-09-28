# ResponseOfLpFormFieldResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`LpFormFieldResponse`](./lpformfieldresponse.md) | No |  |  |
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
              null
            ],
            "subjectField": "string",
            "values": [
              "string"
            ]
          }
        ]
      }
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
- [`LpFormFieldResponse`](./lpformfieldresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
