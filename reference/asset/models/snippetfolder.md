# SnippetFolder

**Type:** `object`

JSON representation of a folder

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `value` | integer (int32) | Yes | Id of the folder |  |
| `type` | string | Yes | Type of folder | enum: Folder, Program |
| `folderName` | string | Yes | Name of folder |  |

## Generated example

```json
{
  "value": 123,
  "type": "Folder",
  "folderName": "Example name"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
