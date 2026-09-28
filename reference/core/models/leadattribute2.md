# LeadAttribute2

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | "API Lead" |  |
| `searchableFields` | array of [`LeadAttribute2SearchableFields`](./leadattribute2searchablefields.md) | Yes | List of searchable fields |  |
| `fields` | array of [`LeadAttribute2Fields`](./leadattribute2fields.md) | Yes | Description of searchable fields |  |

## Generated example

```json
{
  "name": "Example name",
  "searchableFields": [
    [
      "string"
    ]
  ],
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
- [`LeadAttribute2SearchableFields`](./leadattribute2searchablefields.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
