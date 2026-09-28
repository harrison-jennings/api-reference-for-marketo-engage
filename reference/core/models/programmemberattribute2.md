# ProgramMemberAttribute2

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | "API Program Member" |  |
| `description` | string | Yes | "API Program Member Map" |  |
| `createdAt` | string | Yes | Datetime when created |  |
| `updatedAt` | string | Yes | Datetime updated |  |
| `dedupeFields` | array of string | Yes | List of dedupe fields |  |
| `searchableFields` | array of [`LeadAttribute2SearchableFields`](./leadattribute2searchablefields.md) | Yes | List of searchable fields |  |
| `fields` | array of [`LeadAttribute2Fields2`](./leadattribute2fields2.md) | Yes | Description of searchable fields |  |

## Generated example

```json
{
  "name": "Example name",
  "description": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "dedupeFields": [
    "string"
  ],
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

- [`LeadAttribute2Fields2`](./leadattribute2fields2.md)
- [`LeadAttribute2SearchableFields`](./leadattribute2searchablefields.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
