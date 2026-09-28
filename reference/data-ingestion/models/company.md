# Company

**Type:** `object`

Company record. When dedupeBy=dedupeFields, externalCompanyId is required. When dedupeBy=idField, id is required. Additional standard or custom company fields are supported.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | No | Marketo internal company ID. Required when dedupeBy is idField and action is updateOnly. |  |
| `externalCompanyId` | string | No | External company identifier. Required when dedupeBy is dedupeFields. |  |
| `company` | string | No | Company name. |  |

## Generated example

```json
{
  "id": 123,
  "externalCompanyId": "123",
  "company": "string"
}
```

## Source

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).
