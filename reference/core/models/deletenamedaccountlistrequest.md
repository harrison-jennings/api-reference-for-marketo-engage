# DeleteNamedAccountListRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `deleteBy` | string | No | Key to use for deletion of the record |  |
| `input` | array of [`NamedAccountList`](./namedaccountlist.md) | Yes | List of input records |  |

## Generated example

```json
{
  "deleteBy": "string",
  "input": [
    {
      "createdAt": "string",
      "marketoGUID": "123",
      "name": "Example name",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123,
      "status": "created",
      "type": "string",
      "updateable": false,
      "updatedAt": "string"
    }
  ]
}
```

## Referenced models

- [`NamedAccountList`](./namedaccountlist.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
