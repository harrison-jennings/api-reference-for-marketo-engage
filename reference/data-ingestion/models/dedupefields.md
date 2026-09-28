# DedupeFields

**Type:** `object`

Attributes to deduplicate on. One or two attribute names are allowed. Two attributes are used in an AND operation. Supported attributes: id, email, sfdcAccountId, sfdcContactId, sfdcLeadId, sfdcLeadOwnerId, custom attributes (string and integer type only).

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `field1` | string | No |  |  |
| `field2` | string | No |  |  |

## Generated example

```json
{
  "field1": "email",
  "field2": "firstName"
}
```

## Source

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).
