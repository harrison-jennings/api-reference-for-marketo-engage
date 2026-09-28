# FlowStepChoiceAttribute

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the attribute |  |
| `activityTypeAttribId` | integer (int32) | No | Id of the activity type attribute definition |  |
| `name` | string | Yes | Name of the attribute |  |
| `dataType` | string | No | Data type of the attribute value |  |
| `value` | string | No | Value of the attribute |  |
| `format` | string | No | Display format of the value |  |
| `primary` | boolean | No | Whether this is the primary attribute of the flow step |  |

## Generated example

```json
{
  "id": 123,
  "activityTypeAttribId": 123,
  "name": "Example name",
  "dataType": "string",
  "value": "string",
  "format": "string",
  "primary": true
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
