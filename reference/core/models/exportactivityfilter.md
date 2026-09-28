# ExportActivityFilter

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `activityTypeIds` | array of integer (int32) | No | List of activity type ids to filter on |  |
| `primaryAttributeValueIds` | array of integer (int32) | No | List of primary attribute ids to filter on |  |
| `primaryAttributeValues` | array of string | No | List of primary attribute values to filter on |  |
| `createdAt` | [`DateRange`](./daterange.md) | Yes | Date range to filter new activities on |  |

## Generated example

```json
{
  "activityTypeIds": [
    123
  ],
  "primaryAttributeValueIds": [
    123
  ],
  "primaryAttributeValues": [
    "string"
  ],
  "createdAt": {
    "endAt": "string",
    "startAt": "string"
  }
}
```

## Referenced models

- [`DateRange`](./daterange.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
