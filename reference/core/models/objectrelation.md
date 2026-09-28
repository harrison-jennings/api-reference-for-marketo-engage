# ObjectRelation

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `field` | string | Yes | API Name of link field |  |
| `relatedTo` | [`RelatedObject`](./relatedobject.md) | Yes | Object to which the field is linked |  |
| `type` | string | Yes | Type of the relationship field |  |

## Generated example

```json
{
  "field": "string",
  "relatedTo": {
    "field": "string",
    "name": "Example name"
  },
  "type": "string"
}
```

## Referenced models

- [`RelatedObject`](./relatedobject.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
