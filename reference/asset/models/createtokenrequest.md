# CreateTokenRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `folderType` | string | Yes | Type of folder. 'Folder' or 'Program' | enum: Program, Folder |
| `name` | string | Yes | Name of the token. Max length is 50 characters) |  |
| `type` | string | Yes | Type of the token | enum: date, number, rich text, score, sfdc campaign, text |
| `value` | string | Yes | Value of the token |  |

## Generated example

```json
{
  "folderType": "Program",
  "name": "Example name",
  "type": "date",
  "value": "string"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
