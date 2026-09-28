# ReArrangeRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `positions` | array of [`UpdateFieldPosition`](./updatefieldposition.md) | No |  |  |

## Generated example

```json
{
  "positions": [
    {
      "columnNumber": 123,
      "fieldList": [
        "<circular:UpdateFieldPosition>"
      ],
      "fieldName": "Example name",
      "rowNumber": 123
    }
  ]
}
```

## Referenced models

- [`UpdateFieldPosition`](./updatefieldposition.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
