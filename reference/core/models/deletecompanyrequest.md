# DeleteCompanyRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `deleteBy` | string | No | Field to delete company records by. Key may be "dedupeFields" or "idField" |  |
| `input` | array of [`Company`](./company.md) | No | List of company objects. Companies in the list should only contain a member matching the dedupeBy value. Each 'Company' object contains a 'searchableField' for lookup purposes which can be retrieved using the Describe Companies endpoint |  |

## Generated example

```json
{
  "deleteBy": "string",
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
