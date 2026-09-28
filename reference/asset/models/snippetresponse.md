# SnippetResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `createdAt` | string (date-time) | No | Datetime the asset was created |  |
| `description` | string | No | Description of the asset |  |
| `folder` | [`SnippetFolder`](./snippetfolder.md) | Yes | JSON representation of parent folder, with members 'folderName', 'value', and 'type' which may be 'Folder' or 'Program' |  |
| `id` | integer (int64) | No | Id of the asset |  |
| `name` | string | No | Name of the asset |  |
| `status` | string | Yes | Status filter for draft or approved versions |  |
| `updatedAt` | string (date-time) | No | Datetime the asset was most recently updated |  |
| `url` | string | No | Url of the asset in the Marketo UI |  |
| `workspace` | string | No | Name of the workspace |  |

## Generated example

```json
{
  "createdAt": "2026-01-15T10:30:00Z",
  "description": "string",
  "folder": {
    "value": 123,
    "type": "Folder",
    "folderName": "Example name"
  },
  "id": 123,
  "name": "Example name",
  "status": "string",
  "updatedAt": "2026-01-15T10:30:00Z",
  "url": "https://example.com",
  "workspace": "string"
}
```

## Referenced models

- [`SnippetFolder`](./snippetfolder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
