# CustomActivityTypeAttributeRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `attributes` | array of [`CustomActivityTypeAttribute`](./customactivitytypeattribute.md) | No | List of attributes to add to the activity type |  |

## Generated example

```json
{
  "attributes": [
    {
      "apiName": "Example name",
      "dataType": "string",
      "description": "string",
      "isPrimary": false,
      "name": "Example name"
    }
  ]
}
```

## Referenced models

- [`CustomActivityTypeAttribute`](./customactivitytypeattribute.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
