# FlowStep

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the flow step, used in flow step mutation endpoints |  |
| `activityTypeId` | integer (int32) | Yes | Id of the flow step action type |  |
| `activityTypeName` | string | Yes | Name of the flow step action type |  |
| `stepChoice` | array of [`FlowStepChoice`](./flowstepchoice.md) | No |  |  |

## Generated example

```json
{
  "id": 123,
  "activityTypeId": 123,
  "activityTypeName": "Example name",
  "stepChoice": [
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
  ]
}
```

## Referenced models

- [`FlowStepChoice`](./flowstepchoice.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
