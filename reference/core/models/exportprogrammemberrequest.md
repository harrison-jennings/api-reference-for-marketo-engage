# ExportProgramMemberRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `columnHeaderNames` | [`ColumnHeaderNames`](./columnheadernames.md) | No | File header field names override (corresponds with REST API name) |  |
| `fields` | array of string | Yes | Comma-separated list of fields to include in the file |  |
| `filter` | [`ExportProgramMemberFilter`](./exportprogrammemberfilter.md) | Yes | Program member record selection criteria. Must be the following: "programId" |  |
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
    "programId": 123,
    "programIds": [
      123
    ],
    "isExhausted": true,
    "nurtureCadence": "paused",
    "statusNames": [
      "Example name"
    ],
    "updatedAt": {
      "endAt": "string",
      "startAt": "string"
    }
  },
  "format": "string"
}
```

## Referenced models

- [`ColumnHeaderNames`](./columnheadernames.md)
- [`ExportProgramMemberFilter`](./exportprogrammemberfilter.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
