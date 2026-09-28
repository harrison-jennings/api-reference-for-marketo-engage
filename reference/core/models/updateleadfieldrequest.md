# UpdateLeadFieldRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`UpdateLeadField`](./updateleadfield.md) | Yes | Single lead field for input |  |

## Generated example

```json
{
  "input": [
    {
      "displayName": "Example name",
      "description": "string",
      "isHidden": false,
      "isHtmlEncodingInEmail": false,
      "isSensitive": false
    }
  ]
}
```

## Referenced models

- [`UpdateLeadField`](./updateleadfield.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
