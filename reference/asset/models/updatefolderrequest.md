# UpdateFolderRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `description` | string | No | Description of the asset |  |
| `isArchive` | boolean | No | Whether the folder is archived or not. Toggling this value will change the archival status of the folder |  |
| `name` | string | No | Name of the Folder |  |
| `type` | string | Yes | Type of folder. 'Folder' or 'Program' | enum: Folder, Program |

## Generated example

```json
{
  "description": "string",
  "isArchive": true,
  "name": "Example name",
  "type": "Folder"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
