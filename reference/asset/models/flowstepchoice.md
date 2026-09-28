# FlowStepChoice

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the choice, used in choice mutation endpoints |  |
| `default` | boolean | Yes | Whether this is the default choice for the flow step |  |
| `attributes` | array of [`FlowStepChoiceAttribute`](./flowstepchoiceattribute.md) | No |  |  |
| `rule` | [`FlowStepChoiceRule`](./flowstepchoicerule.md) | No | Condition for the choice, present on non-default choices |  |

## Generated example

```json
{
  "id": 123,
  "default": true,
  "attributes": [
    {
      "id": 123,
      "activityTypeAttribId": 123,
      "name": "Example name",
      "dataType": "string",
      "value": "string",
      "format": "string",
      "primary": true
    }
  ],
  "rule": {
    "name": "Example name",
    "operator": "string",
    "ruleType": "Activity",
    "ruleTypeId": 123,
    "values": [
      "string"
    ]
  }
}
```

## Referenced models

- [`FlowStepChoiceAttribute`](./flowstepchoiceattribute.md)
- [`FlowStepChoiceRule`](./flowstepchoicerule.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
