# FolderResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `accessZoneId` | integer (int32) | No |  |  |
| `createdAt` | string (date-time) | Yes | Datetime the folder was created |  |
| `description` | string | No | Description of the folder |  |
| `folderId` | [`Folder`](./folder.md) | Yes | Id of the folder |  |
| `folderType` | string | Yes | Type of folder | enum: Email, Email Batch Program, Email Template, Image, Landing Page, Landing Page Form, Landing Page Template, Marketing Event, Marketing Folder, Marketing Program, Nurture Program, Report, Revenue Cycle Model, Zone |
| `id` | integer (int32) | Yes | Id of the folder |  |
| `isArchive` | boolean | Yes | Archival status of the folder |  |
| `isSystem` | boolean | No | Whether the folder is system-managed |  |
| `name` | string | Yes | Name of the folder. Not applicable for Programs |  |
| `parent` | [`Folder`](./folder.md) | Yes | Parent folder reference |  |
| `path` | string | Yes | Path of the folder |  |
| `updatedAt` | string (date-time) | Yes | Datetime the folder was last updated |  |
| `url` | string | Yes | Url of the folder |  |
| `workspace` | string | No | Name of the workspace |  |

## Generated example

```json
{
  "accessZoneId": 123,
  "createdAt": "2026-01-15T10:30:00Z",
  "description": "string",
  "folderId": {
    "id": 123,
    "type": "Folder"
  },
  "folderType": "Email",
  "id": 123,
  "isArchive": true,
  "isSystem": true,
  "name": "Example name",
  "parent": {
    "id": 123,
    "type": "Folder"
  },
  "path": "string",
  "updatedAt": "2026-01-15T10:30:00Z",
  "url": "https://example.com",
  "workspace": "string"
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
