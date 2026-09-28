# ExportCustomObjectRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `columnHeaderNames` | [`ColumnHeaderNames`](./columnheadernames.md) | No | File header field names override (corresponds with REST API name) |  |
| `fields` | array of string | Yes | Comma-separated list of custom object attributes to include in the file |  |
| `filter` | [`ExportCustomObjectFilter`](./exportcustomobjectfilter.md) | Yes | Custom object record selection criteria. Can be one of the following: "updatedAt", "staticListName", "staticListId", "smartListName", "smartListId" |  |
| `format` | string | No | File format to create("CSV", "TSV", "SSV"). Default is "CSV" |  |

## Generated example

```json
{
  "columnHeaderNames": {
    "name": "Example name",
    "value": "string"
  },
  "fields": [
    "string"
  ],
  "filter": {
    "updatedAt": {
      "endAt": "string",
      "startAt": "string"
    },
    "smartListId": 123,
    "smartListName": "Example name",
    "staticListId": 123,
    "staticListName": "Example name"
  },
  "format": "string"
}
```

## Referenced models

- [`ColumnHeaderNames`](./columnheadernames.md)
- [`ExportCustomObjectFilter`](./exportcustomobjectfilter.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
