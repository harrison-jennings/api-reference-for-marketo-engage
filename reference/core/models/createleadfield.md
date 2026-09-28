# CreateLeadField

**Type:** `object`

Lead field record for create

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `displayName` | string | Yes | UI display-name of the field. Must be unique, cannot contain special characters |  |
| `name` | string | Yes | API name of the field. Must be unique, start with a letter, and only contain letters, numbers, or underscore |  |
| `description` | string | No | Description of the field. Default is no description |  |
| `dataType` | string | Yes | Datatype of the field | enum: boolean, currency, date, datetime, email, float, integer, percent, phone, score, string, url |
| `isHidden` | boolean | No | If set to true, the field is hidden. Default is false |  |
| `isHtmlEncodingInEmail` | boolean | No | If set to true, field is encoded as HTML in email. Default is true |  |
| `isSensitive` | boolean | No | If set to true, field is marked as sensitive. Default is false |  |

## Generated example

```json
{
  "displayName": "Example name",
  "name": "Example name",
  "description": "string",
  "dataType": "boolean",
  "isHidden": false,
  "isHtmlEncodingInEmail": false,
  "isSensitive": false
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
