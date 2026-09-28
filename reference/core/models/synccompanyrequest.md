# SyncCompanyRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `action` | string | No | Type of sync operation to perform | enum: createOnly, updateOnly, createOrUpdate |
| `dedupeBy` | string | No | Field to deduplicate on. If the value in the field for a given record is not unique, an error will be returned for the individual record. |  |
| `input` | array of [`Company`](./company.md) | Yes | List of input records. Each 'Company' object contains a 'searchableField' for lookup purposes, and one or more 'fields' to create or update. Both can be retrieved using the Describe Companies endpoint |  |

## Generated example

```json
{
  "action": "createOnly",
  "dedupeBy": "string",
  "input": [
    {
      "externalCompanyId": "123",
      "id": 123,
      "company": "string"
    }
  ]
}
```

## Referenced models

- [`Company`](./company.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
