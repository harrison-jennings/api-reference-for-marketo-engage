# AddCustomObjectTypeFieldsRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`AddCustomObjectTypeField`](./addcustomobjecttypefield.md) | Yes | List of fields to add to custom object type |  |

## Generated example

```json
{
  "input": [
    {
      "name": "Example name",
      "displayName": "Example name",
      "dataType": "string",
      "description": "string",
      "isDedupeField": true,
      "relatedTo": {
        "name": "Example name",
        "field": "string"
      }
    }
  ]
}
```

## Referenced models

- [`AddCustomObjectTypeField`](./addcustomobjecttypefield.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
