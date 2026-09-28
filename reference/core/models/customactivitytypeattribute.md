# CustomActivityTypeAttribute

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | Yes | API Name of the attribute |  |
| `dataType` | string | No | Data type of the attribute | enum: string, boolean, integer, float, link, email, currency, date, datetime, phone, text |
| `description` | string | No | Description of the attribute |  |
| `isPrimary` | boolean | No | Whether the attribute is the primary attribute of the activity type. There may only be one primary attribute at a time |  |
| `name` | string | Yes | Human-readable display name of the attribute |  |

## Generated example

```json
{
  "apiName": "Example name",
  "dataType": "string",
  "description": "string",
  "isPrimary": false,
  "name": "Example name"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
