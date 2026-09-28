# CreateFileRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `description` | string | No | Description of the asset |  |
| `file` | string | Yes | Multipart file. Content of the file. |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `insertOnly` | boolean | No | Whether the calls hould fail if there is already an existing file with the same name |  |
| `name` | string | Yes | Name of the File |  |

## Generated example

```json
{
  "description": "string",
  "file": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "insertOnly": true,
  "name": "Example name"
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
