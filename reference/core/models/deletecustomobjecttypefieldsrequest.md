# DeleteCustomObjectTypeFieldsRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`DeleteCustomObjectTypeField`](./deletecustomobjecttypefield.md) | Yes | List of fields to delete from the custom object type |  |

## Generated example

```json
{
  "input": [
    {
      "name": "Example name"
    }
  ]
}
```

## Referenced models

- [`DeleteCustomObjectTypeField`](./deletecustomobjecttypefield.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
