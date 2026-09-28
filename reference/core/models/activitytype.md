# ActivityType

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | No |  |  |
| `attributes` | array of [`ActivityTypeAttribute`](./activitytypeattribute.md) | Yes | List of secondary attributes of the type |  |
| `description` | string | No | Description of the activity type |  |
| `id` | integer (int32) | Yes | Id of the activity type |  |
| `name` | string | Yes | Name of the activity type |  |
| `primaryAttribute` | [`ActivityTypeAttribute`](./activitytypeattribute.md) | Yes | Primary attribute of the type |  |

## Generated example

```json
{
  "apiName": "Example name",
  "attributes": [
    {
      "apiName": "Example name",
      "dataType": "string",
      "name": "Example name"
    }
  ],
  "description": "string",
  "id": 123,
  "name": "Example name",
  "primaryAttribute": {
    "apiName": "Example name",
    "dataType": "string",
    "name": "Example name"
  }
}
```

## Referenced models

- [`ActivityTypeAttribute`](./activitytypeattribute.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
