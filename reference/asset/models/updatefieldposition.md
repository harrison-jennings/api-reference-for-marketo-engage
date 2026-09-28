# UpdateFieldPosition

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `columnNumber` | integer (int32) | Yes | Column number of the field |  |
| `fieldList` | array of [`UpdateFieldPosition`](./updatefieldposition.md) | No | List of positions inside the fields. Only valid if the target is a fieldset |  |
| `fieldName` | string | Yes | Id of the field |  |
| `rowNumber` | integer (int32) | Yes | Row number of the field |  |

## Generated example

```json
{
  "columnNumber": 123,
  "fieldList": [
    {
      "columnNumber": 123,
      "fieldList": [
        "<circular:UpdateFieldPosition>"
      ],
      "fieldName": "Example name",
      "rowNumber": 123
    }
  ],
  "fieldName": "Example name",
  "rowNumber": 123
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
