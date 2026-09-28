# SyncNamedAccountListRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `action` | string | No | Type of sync operation to perform | enum: createOnly, updateOnly |
| `dedupeBy` | string | No | Field to deduplicate on. If the value in the field for a given record is not unique, an error will be returned for the individual record. |  |
| `input` | array of [`NamedAccountList`](./namedaccountlist.md) | Yes | List of input records |  |

## Generated example

```json
{
  "action": "createOnly",
  "dedupeBy": "string",
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
