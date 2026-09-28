# ResponseOfFieldsMetaDataResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`FieldsMetaDataResponse`](./fieldsmetadataresponse.md) | No |  |  |
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
      "dataType": "string",
      "defaultValue": "string",
      "description": "string",
      "fieldMaskValues": "string",
      "fieldWidth": 123,
      "id": "123",
      "initiallyChecked": true,
      "isLabelToRight": true,
      "isMultiselect": true,
      "isRequired": true,
      "isSensitive": true,
      "labelWidth": 123,
      "maxLength": 123,
      "maximumNumber": 123,
      "minimumNumber": 123,
      "picklistValues": "string",
      "placeholderText": "string",
      "validationMessage": "string",
      "visibleRows": 123
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
- [`FieldsMetaDataResponse`](./fieldsmetadataresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
