# CustomActivityTypeRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | Yes |  |  |
| `description` | string | No |  |  |
| `filterName` | string | Yes | Human-readable name of the associated filter |  |
| `name` | string | Yes | Human-readable display name of the activity type |  |
| `primaryAttribute` | [`CustomActivityTypeAttribute`](./customactivitytypeattribute.md) | Yes | Primary attribute of the activity type |  |
| `triggerName` | string | Yes | Human-readable name of the associated trigger |  |

## Generated example

```json
{
  "apiName": "Example name",
  "description": "string",
  "filterName": "Example name",
  "name": "Example name",
  "primaryAttribute": {
    "apiName": "Example name",
    "dataType": "string",
    "description": "string",
    "isPrimary": false,
    "name": "Example name"
  },
  "triggerName": "Example name"
}
```

## Referenced models

- [`CustomActivityTypeAttribute`](./customactivitytypeattribute.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
