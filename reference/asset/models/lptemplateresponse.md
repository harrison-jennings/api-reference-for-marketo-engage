# LpTemplateResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `createdAt` | string (date-time) | No | Datetime the asset was created |  |
| `description` | string | No | Description of the asset |  |
| `enableMunchkin` | boolean | Yes | Whether to enable munchkin on the derived pages. Defaults to true |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `id` | integer (int64) | No | Id of the asset |  |
| `name` | string | No | Name of the asset |  |
| `status` | string | Yes | Status filter for draft or approved versions |  |
| `templateType` | string | Yes | Type of template to create. Defaults to freeForm | enum: guided, freeForm |
| `updatedAt` | string (date-time) | No | Datetime the asset was most recently updated |  |
| `url` | string | No | Url of the asset in the Marketo UI |  |
| `workspace` | string | No | Name of the workspace. Max 255 characters |  |

## Generated example

```json
{
  "createdAt": "2026-01-15T10:30:00Z",
  "description": "string",
  "enableMunchkin": true,
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "id": 123,
  "name": "Example name",
  "status": "string",
  "templateType": "guided",
  "updatedAt": "2026-01-15T10:30:00Z",
  "url": "https://example.com",
  "workspace": "string"
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
