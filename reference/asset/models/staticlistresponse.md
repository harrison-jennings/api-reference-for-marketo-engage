# StaticListResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | Yes | Id of the static list |  |
| `name` | string | Yes | Name of the static list |  |
| `description` | string | Yes | Description of the static list |  |
| `createdAt` | string (date-time) | Yes | Datetime the static list was created |  |
| `updatedAt` | string (date-time) | Yes | Datetime the static list was most recently updated |  |
| `url` | string | No | May not be present in the response |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `workspace` | string | Yes | Name of the workspace |  |
| `computedUrl` | string | No | Url of the asset in the Marketo UI |  |

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
  "workspace": "string",
  "computedUrl": "https://example.com"
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
