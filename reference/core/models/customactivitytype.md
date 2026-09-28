# CustomActivityType

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | No | API Name of the type. The API name must be unique and alphanumeric, containing at least one letter. It is highly recommended to prepend a unique namespace of up to sixteen characters to the API name. Required on creation |  |
| `attributes` | array of [`CustomActivityTypeAttribute`](./customactivitytypeattribute.md) | No | List of attributes for the activity type. May only be added or update through Create or Update Custom Activity Type Attributes |  |
| `createdAt` | string | No | Datetime when the activity type was created |  |
| `description` | string | No | Description of the activity type |  |
| `filterName` | string | No | Human-readable name for the associated filter of the activity type. Required on creation |  |
| `id` | integer (int32) | No |  |  |
| `name` | string | No | Human-readable display name of the type. Required on creation |  |
| `primaryAttribute` | [`CustomActivityTypeAttribute`](./customactivitytypeattribute.md) | No | Primary Attribute of the activity type. Required on creation |  |
| `status` | string | No | State of the activity type | enum: draft, approved, deleted, approved with draft |
| `triggerName` | string | No | Human-readable name for the associated trigger of the activity type. Required on creation |  |
| `updatedAt` | string | No | Datetime when the activity type was most recently updated |  |

## Generated example

```json
{
  "apiName": "Example name",
  "attributes": [
    {
      "apiName": "Example name",
      "dataType": "string",
      "description": "string",
      "isPrimary": false,
      "name": "Example name"
    }
  ],
  "createdAt": "string",
  "description": "string",
  "filterName": "Example name",
  "id": 123,
  "name": "Example name",
  "primaryAttribute": {
    "apiName": "Example name",
    "dataType": "string",
    "description": "string",
    "isPrimary": false,
    "name": "Example name"
  },
  "status": "draft",
  "triggerName": "Example name",
  "updatedAt": "string"
}
```

## Referenced models

- [`CustomActivityTypeAttribute`](./customactivitytypeattribute.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
