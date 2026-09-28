# DeleteCustomObjectRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `deleteBy` | string | No | Field to delete records by. Permissible values are idField or dedupeFields as indicated by the result of the corresponding describe record |  |
| `input` | array of [`CustomObject`](./customobject.md) | Yes | List of input records |  |

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
      "seq": 123
    }
  ]
}
```

## Referenced models

- [`CustomObject`](./customobject.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
