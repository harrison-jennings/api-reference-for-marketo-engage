# ProgramMemberAttribute

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | No | "API Program Member" |  |
| `fields` | array of [`LeadAttribute2Fields`](./leadattribute2fields.md) | Yes | Description of searchable fields |  |

## Generated example

```json
{
  "name": "Example name",
  "fields": [
    {
      "name": "Example name",
      "displayName": "Example name",
      "dataType": "string",
      "length": 123,
      "updateable": true,
      "crmManaged": true
    }
  ]
}
```

## Referenced models

- [`LeadAttribute2Fields`](./leadattribute2fields.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
