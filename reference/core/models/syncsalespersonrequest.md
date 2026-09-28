# SyncSalesPersonRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `action` | string | No | Type of sync operation to perform | enum: createOnly, updateOnly, createOrUpdate |
| `dedupeBy` | string | No | Field to deduplicate on. If the value in the field for a given record is not unique, an error will be returned for the individual record. |  |
| `input` | array of [`SalesPerson`](./salesperson.md) | Yes | List of input records |  |

## Generated example

```json
{
  "action": "createOnly",
  "dedupeBy": "string",
  "input": [
    {
      "id": 123,
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123,
      "status": "created"
    }
  ]
}
```

## Referenced models

- [`SalesPerson`](./salesperson.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
