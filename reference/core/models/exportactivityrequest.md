# ExportActivityRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `columnHeaderNames` | [`ColumnHeaderNames`](./columnheadernames.md) | No | File header field names override (corresponds with REST API name) |  |
| `fields` | array of string | Yes | Array of strings containing field values. Used to reduce the number of fields contained in export file. Select one or more of: marketoGUID, leadId, activityDate, activityTypeId, campaignId, primaryAttributeValueId, primaryAttributeValue, actionResult |  |
| `filter` | [`ExportActivityFilter`](./exportactivityfilter.md) | Yes | Record selection criteria. "createdAt" is required, "activityTypeIds", "primaryAttributeValueIds", and "primaryAttributeValues" are optional |  |
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
  },
  "format": "string"
}
```

## Referenced models

- [`ColumnHeaderNames`](./columnheadernames.md)
- [`ExportActivityFilter`](./exportactivityfilter.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
