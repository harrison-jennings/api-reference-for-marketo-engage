# DeleteNamedAccountRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `deleteBy` | string | No | Key to use for deletion of the record |  |
| `input` | array of [`NamedAccount`](./namedaccount.md) | Yes | List of input records |  |

## Generated example

```json
{
  "deleteBy": "string",
  "input": [
    {
      "marketoGUID": "123",
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

- [`NamedAccount`](./namedaccount.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
