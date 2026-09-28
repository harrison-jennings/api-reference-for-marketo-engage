# FormVisibilityRuleDTO

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `altLabel` | string | No |  |  |
| `operator` | string | No |  |  |
| `picklistFilterValues` | array of [`PickListDTO`](./picklistdto.md) | No |  |  |
| `subjectField` | string | No |  |  |
| `values` | array of string | No |  |  |

## Generated example

```json
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
```

## Referenced models

- [`PickListDTO`](./picklistdto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
