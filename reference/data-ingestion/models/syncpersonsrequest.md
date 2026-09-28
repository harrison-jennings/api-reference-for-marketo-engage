# SyncPersonsRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `priority` | string | No | Priority of the request. | enum: normal, high; default: normal |
| `partitionName` | string | No | Name of person partition. | default: Default |
| `dedupeFields` | [`DedupeFields`](./dedupefields.md) | No |  |  |
| `persons` | array of [`Person`](./person.md) | Yes | List of attribute name-value pairs for the person. |  |

## Generated example

```json
{
  "priority": "normal",
  "partitionName": "Default",
  "dedupeFields": {
    "field1": "email",
    "field2": "firstName"
  },
  "persons": [
    {
      "email": "brooklyn.parker@karnv.com",
      "firstName": "Brooklyn",
      "lastName": "Parker",
      "company": "Karnv"
    }
  ]
}
```

## Referenced models

- [`DedupeFields`](./dedupefields.md)
- [`Person`](./person.md)

## Source

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).
