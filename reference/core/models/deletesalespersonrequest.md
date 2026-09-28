# DeleteSalesPersonRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `deleteBy` | string | No | Key to use for deletion of the record |  |
| `input` | array of [`SalesPerson`](./salesperson.md) | Yes | List of input records |  |

## Generated example

```json
{
  "deleteBy": "string",
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
