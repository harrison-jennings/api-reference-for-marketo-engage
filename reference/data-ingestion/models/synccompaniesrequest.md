# SyncCompaniesRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `action` | string | No | Sync action. For createOnly and createOrUpdate, only dedupeFields is allowed for dedupeBy. For updateOnly, both dedupeFields and idField are allowed. | enum: createOnly, updateOnly, createOrUpdate; default: createOrUpdate |
| `dedupeBy` | string | No | Field to deduplicate on (case-insensitive). | enum: dedupeFields, idField; default: dedupeFields |
| `input` | array of [`Company`](./company.md) | Yes | List of company attribute name-value pairs. |  |

## Generated example

```json
{
  "action": "createOrUpdate",
  "dedupeBy": "dedupeFields",
  "input": [
    {
      "id": 123,
      "externalCompanyId": "123",
      "company": "string"
    }
  ]
}
```

## Referenced models

- [`Company`](./company.md)

## Source

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).
