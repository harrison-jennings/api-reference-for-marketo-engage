# FileResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `createdAt` | string (date-time) | Yes | Datetime when the file was created |  |
| `description` | string | No | Description of the file |  |
| `folder` | [`FileFolder`](./filefolder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `id` | integer (int32) | Yes | Id of the file |  |
| `mimeType` | string | Yes | MIME type of the file |  |
| `name` | string | Yes | Name of the file |  |
| `size` | integer (int32) | Yes | Size of the file in bytes |  |
| `updatedAt` | string (date-time) | Yes | Datetime when the file was most recently updated |  |
| `url` | string | Yes | Publically accessible URL of the file |  |

## Generated example

```json
{
  "createdAt": "2026-01-15T10:30:00Z",
  "description": "string",
  "folder": {
    "id": 123,
    "name": "Example name",
    "type": "string"
  },
  "id": 123,
  "mimeType": "string",
  "name": "Example name",
  "size": 123,
  "updatedAt": "2026-01-15T10:30:00Z",
  "url": "https://example.com"
}
```

## Referenced models

- [`FileFolder`](./filefolder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
