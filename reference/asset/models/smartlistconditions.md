# SmartListConditions

**Type:** `object`

JSON representation of smart list conditions

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `activityAttributeId` | integer (int32) | No | Id of the activity attribute. Present on conditions of activity rules |  |
| `activityAttributeName` | string | No | Name of the activity attribute. Present on conditions of activity rules |  |
| `attributeId` | integer (int64) | No | Id of the field. Present on conditions of attribute rules |  |
| `attributeName` | string | No | Name of the field. Present on conditions of attribute rules |  |
| `operator` | string | No | Value of operator |  |
| `values` | array of string | Yes | List of values |  |
| `isPrimary` | boolean | No | Whether the condition is primary or not (first condition of the smart list) |  |
| `isError` | boolean | No | Whether the condition has a validation error |  |
| `errorMessage` | string | No | Validation error of the condition. Present when isError is true |  |

## Generated example

```json
{
  "activityAttributeId": 123,
  "activityAttributeName": "Example name",
  "attributeId": 123,
  "attributeName": "Example name",
  "operator": "string",
  "values": [
    "string"
  ],
  "isPrimary": true,
  "isError": true,
  "errorMessage": "string"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
