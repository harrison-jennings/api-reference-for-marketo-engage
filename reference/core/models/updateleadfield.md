# UpdateLeadField

**Type:** `object`

Lead field record for update

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `displayName` | string | No | UI display-name of the field |  |
| `description` | string | No | Description of the field |  |
| `isHidden` | boolean | No | If set to true, the field is hidden. Default is false |  |
| `isHtmlEncodingInEmail` | boolean | No | If set to true, field is encoded as HTML in email. Default is true |  |
| `isSensitive` | boolean | No | If set to true, field is marked as sensitive. Default is false |  |

## Generated example

```json
{
  "displayName": "Example name",
  "description": "string",
  "isHidden": false,
  "isHtmlEncodingInEmail": false,
  "isSensitive": false
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
