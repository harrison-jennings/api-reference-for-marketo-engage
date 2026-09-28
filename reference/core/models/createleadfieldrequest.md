# CreateLeadFieldRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`CreateLeadField`](./createleadfield.md) | Yes | List of lead fields for input |  |

## Generated example

```json
{
  "input": [
    {
      "displayName": "Example name",
      "name": "Example name",
      "description": "string",
      "dataType": "boolean",
      "isHidden": false,
      "isHtmlEncodingInEmail": false,
      "isSensitive": false
    }
  ]
}
```

## Referenced models

- [`CreateLeadField`](./createleadfield.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
