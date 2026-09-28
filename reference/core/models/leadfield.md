# LeadField

**Type:** `object`

Lead field record

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `displayName` | string | Yes | UI display-name of the field |  |
| `name` | string | Yes | API name of the field |  |
| `description` | string | Yes | Description of the field |  |
| `dataType` | string | Yes | Datatype of the field |  |
| `length` | integer (int32) | No | Max length of the field. Only applicable to text, string, and text area. |  |
| `isHidden` | boolean | Yes | If set to true, the field is hidden |  |
| `isHtmlEncodingInEmail` | boolean | Yes | If set to true, field is encoded as HTML in email |  |
| `isSensitive` | boolean | Yes | If set to true, field is marked as sensitive |  |
| `isCustom` | boolean | Yes | If set to true, field is custom |  |
| `isApiCreated` | boolean | Yes | If set to true, field was created using REST API |  |

## Generated example

```json
{
  "displayName": "Example name",
  "name": "Example name",
  "description": "string",
  "dataType": "string",
  "length": 123,
  "isHidden": false,
  "isHtmlEncodingInEmail": false,
  "isSensitive": false,
  "isCustom": false,
  "isApiCreated": false
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
