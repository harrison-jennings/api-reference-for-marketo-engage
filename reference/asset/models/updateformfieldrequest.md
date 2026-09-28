# UpdateFormFieldRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `blankFields` | integer (int32) | No | Number of blank fields to show when progressive profiling is enabled |  |
| `defaultValue` | string | No | Optional default value for the field |  |
| `fieldType` | string | No | Type of field |  |
| `fieldWidth` | integer (int32) | No | Width of the input or select element |  |
| `formPrefill` | boolean | No | Whether the field should prefill. Default true |  |
| `isSensitive` | boolean | No | Whether the field is marked as sensitive. Default false |  |
| `hintText` | string | No | Hint text for the field |  |
| `initiallyChecked` | boolean | No | Whether the field should be checked upon loading. Default false |  |
| `instructions` | string | No | Instructions for the field |  |
| `label` | string | No | Label of the field |  |
| `labelToRight` | boolean | No | Whether the field label should be displayed to the right of the input/select element. Default false |  |
| `labelWidth` | integer (int32) | No | Width of the field label element |  |
| `maskInput` | string | No | Optional input mask for the field |  |
| `maxLength` | integer (int32) | No | Maximum length for text type fields |  |
| `maxValue` | number (float) | No | Maximum value accepted by the field |  |
| `minValue` | number (float) | No | Minimum value accepted by the field |  |
| `multiSelect` | boolean | No | Whether the field should allow multiple selections. Default false |  |
| `required` | boolean | No | Whether the field is required to submit the form. Default false |  |
| `validationMessage` | string | No | Validation message to display on failed validation |  |
| `values` | string | No | Array of JSON objects that contain field attributes. Only for select-field types. Example: values=[{'label':'Select...','value':'','isDefault':true,'selected':true}, {'label':'MR','value':'Mr'}, {'label':'MS','value':'Ms'}, {'label':'MRS','value':'Mrs'}, {'label':'DR','value':'Dr'}, {'label':'PROF','value':'Prof'}] |  |
| `visibleLines` | integer (int32) | No | Number of lines to display for the field element |  |

## Generated example

```json
{
  "blankFields": 123,
  "defaultValue": "string",
  "fieldType": "string",
  "fieldWidth": 123,
  "formPrefill": true,
  "isSensitive": true,
  "hintText": "string",
  "initiallyChecked": true,
  "instructions": "string",
  "label": "string",
  "labelToRight": true,
  "labelWidth": 123,
  "maskInput": "string",
  "maxLength": 123,
  "maxValue": 123,
  "minValue": 123,
  "multiSelect": true,
  "required": true,
  "validationMessage": "string",
  "values": "string",
  "visibleLines": 123
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
