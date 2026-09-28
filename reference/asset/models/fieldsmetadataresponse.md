# FieldsMetaDataResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `dataType` | string | No | Type of field |  |
| `defaultValue` | string | No | Optional default value for the field |  |
| `description` | string | No | Description of the field |  |
| `fieldMaskValues` | string | No | Optional input mask for the field |  |
| `fieldWidth` | integer (int32) | No | Width of the input or select element |  |
| `id` | string | Yes | Id of the field |  |
| `initiallyChecked` | boolean | No | Whether the field should be checked upon loading. Default false |  |
| `isLabelToRight` | boolean | No | Whether the field label should be displayed to the right of the input/select element. Default false |  |
| `isMultiselect` | boolean | No | Whether the field should allow multiple selections. Default false |  |
| `isRequired` | boolean | No | Whether the field is required to submit the form. Default false |  |
| `isSensitive` | boolean | No | Whether the field is marked as sensitive. Default false |  |
| `labelWidth` | integer (int32) | No | Width of the field label element |  |
| `maxLength` | integer (int32) | No | Maximum length for text type fields |  |
| `maximumNumber` | number (float) | No | Maximum value accepted by the field |  |
| `minimumNumber` | number (float) | No | Minimum value accepted by the field |  |
| `picklistValues` | string | No | Comma-separated list of available picklist values for the field |  |
| `placeholderText` | string | No | Placeholder text for the field |  |
| `validationMessage` | string | No | Validation message to display on failed validation |  |
| `visibleRows` | integer (int32) | No | Number of rows visible for progressive profiling |  |

## Generated example

```json
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
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
