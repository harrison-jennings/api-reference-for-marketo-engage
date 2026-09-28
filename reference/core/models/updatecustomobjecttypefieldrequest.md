# UpdateCustomObjectTypeFieldRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | No | API Name of custom object field |  |
| `displayName` | string | No | UI display-name of the custom object field |  |
| `dataType` | string | No | Datatype of the custom object field |  |
| `description` | string | No | Description of the custom object field |  |
| `isDedupeField` | boolean | No | Set to true to enable field as unique identifier for deduplicating records. Default is false |  |
| `relatedTo` | [`CustomObjectTypeFieldRelatedTo`](./customobjecttypefieldrelatedto.md) | No | Define custom object link field |  |

## Generated example

```json
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
```

## Referenced models

- [`CustomObjectTypeFieldRelatedTo`](./customobjecttypefieldrelatedto.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
