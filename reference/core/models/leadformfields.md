# LeadFormFields

**Type:** `object`

Form fields. Always contains email, but may have any number of other fields depending on the fields available in the form.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `email` | string | Yes | Email address used as primary key during lead upsert |  |

## Generated example

```json
{
  "email": "person@example.com"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
