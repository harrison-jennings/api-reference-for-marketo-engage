# Form

**Type:** `object`

Form field data. May have any number of fields depending on the fields available in the form.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `leadFormFields` | [`LeadFormFields`](./leadformfields.md) | Yes | List of form fields. Email is required field |  |
| `visitorData` | [`VisitorData`](./visitordata.md) | No | Page visit-related data |  |
| `cookie` | string | No | Munchkin cookie value used to associate new lead with anonymous activities. e.g. id:123-XYZ-456&tooken:_mch-marketo.com-1594662481190-60776 |  |

## Generated example

```json
{
  "leadFormFields": {
    "email": "person@example.com"
  },
  "visitorData": {
    "pageURL": "https://example.com",
    "queryString": "string",
    "leadClientIpAddress": "string",
    "userAgentString": "string"
  },
  "cookie": "string"
}
```

## Referenced models

- [`LeadFormFields`](./leadformfields.md)
- [`VisitorData`](./visitordata.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
