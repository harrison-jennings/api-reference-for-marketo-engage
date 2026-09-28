# ExportLeadFilter

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `createdAt` | [`DateRange`](./daterange.md) | No | Date range to filter new leads on |  |
| `smartListId` | integer (int32) | No | Id of smart list to retrieve leads from |  |
| `smartListName` | string | No | Name of smart list to retrieve leads from |  |
| `staticListId` | integer (int32) | No | Id of static list to retrieve leads from |  |
| `staticListName` | string | No | Name of static list to retrieve leads from |  |
| `updatedAt` | [`DateRange`](./daterange.md) | No | Date range to filter updated leads on |  |

## Generated example

```json
{
  "createdAt": {
    "endAt": "string",
    "startAt": "string"
  },
  "smartListId": 123,
  "smartListName": "Example name",
  "staticListId": 123,
  "staticListName": "Example name",
  "updatedAt": {
    "endAt": "string",
    "startAt": "string"
  }
}
```

## Referenced models

- [`DateRange`](./daterange.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
