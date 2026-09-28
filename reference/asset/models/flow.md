# Flow

**Type:** `object`

Flow steps of a smart campaign

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `steps` | array of [`FlowStep`](./flowstep.md) | No |  |  |

## Generated example

```json
{
  "steps": [
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
  ]
}
```

## Referenced models

- [`FlowStep`](./flowstep.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
