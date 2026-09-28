# ObjectMetaData

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `createdAt` | string (date-time) | Yes | Datetime when the object type was created |  |
| `dedupeFields` | array of string | Yes | List of dedupe fields. Arrays with multiple members are compound keys |  |
| `description` | string | Yes | Description of the object type |  |
| `displayName` | string | Yes | UI display-name of the object type |  |
| `pluralName` | string | Yes | UI plural-name of the custom object type |  |
| `fields` | array of [`ObjectField`](./objectfield.md) | Yes | List of fields available on the object type |  |
| `idField` | string | Yes | Primary id key of the object type |  |
| `apiName` | string | Yes | Name of the object type |  |
| `relationships` | array of [`ObjectRelation`](./objectrelation.md) | Yes | List of relationships which the object has |  |
| `searchableFields` | array of array of string | Yes | List of fields valid for use as a filter type in a query |  |
| `updatedAt` | string (date-time) | Yes | Datetime when the object type was most recently updated |  |
| `state` | string | No | Approval state of object type | enum: draft, approved, approvedWithDraft |
| `version` | string | Yes | Version of object type that is returned in response | enum: draft, approved |

## Generated example

```json
{
  "createdAt": "2026-01-15T10:30:00Z",
  "dedupeFields": [
    "string"
  ],
  "description": "string",
  "displayName": "Example name",
  "pluralName": "Example name",
  "fields": [
    {
      "dataType": "string",
      "displayName": "Example name",
      "length": 123,
      "name": "Example name",
      "updateable": false,
      "crmManaged": false
    }
  ],
  "idField": "string",
  "apiName": "Example name",
  "relationships": [
    {
      "field": "string",
      "relatedTo": {
        "field": "string",
        "name": "Example name"
      },
      "type": "string"
    }
  ],
  "searchableFields": [
    [
      "string"
    ]
  ],
  "updatedAt": "2026-01-15T10:30:00Z",
  "state": "draft",
  "version": "draft"
}
```

## Referenced models

- [`ObjectField`](./objectfield.md)
- [`ObjectRelation`](./objectrelation.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
