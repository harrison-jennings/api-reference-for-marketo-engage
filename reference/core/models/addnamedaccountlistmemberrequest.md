# AddNamedAccountListMemberRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`NamedAccount`](./namedaccount.md) | Yes | List of input records |  |

## Generated example

```json
{
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
