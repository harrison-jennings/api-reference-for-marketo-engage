# SmartListResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | Yes | Id of the smart list |  |
| `name` | string | Yes | Name of the smart list |  |
| `description` | string | Yes | Description of the smart list |  |
| `createdAt` | string (date-time) | Yes | Datetime the smart list was created |  |
| `updatedAt` | string (date-time) | Yes | Datetime the smart list was most recently updated |  |
| `url` | string | No | Url of the smart list in the Marketo UI |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `workspace` | string | Yes | Name of the workspace |  |

## Generated example

```json
{
  "id": 123,
  "name": "Example name",
  "description": "string",
  "createdAt": "2026-01-15T10:30:00Z",
  "updatedAt": "2026-01-15T10:30:00Z",
  "url": "https://example.com",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "workspace": "string"
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
