# BrowseAllPrograms

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `channel` | string | Yes | Channel of the program |  |
| `createdAt` | string (date-time) | No | Datetime the asset was created |  |
| `description` | string | No | Description of the asset |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `id` | integer (int64) | No | Id of the asset |  |
| `name` | string | No | Name of the asset |  |
| `sfdcId` | string | No | SFDC id of the program if linked to an SFDC campaign |  |
| `sfdcName` | string | No | Name of the linked SFDC campaign if applicable |  |
| `status` | string | Yes | Status of the program. Only valid for Email and engagement program types. | enum: locked, unlocked, on, off |
| `type` | string | Yes | Type of the program | enum: program, event, webinar, nurture |
| `updatedAt` | string (date-time) | No | Datetime the asset was most recently updated |  |
| `url` | string | No | Url of the asset in the Marketo UI |  |
| `workspace` | string | No | Name of the workspace |  |

## Generated example

```json
{
  "channel": "string",
  "createdAt": "2026-01-15T10:30:00Z",
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "id": 123,
  "name": "Example name",
  "sfdcId": "123",
  "sfdcName": "Example name",
  "status": "locked",
  "type": "program",
  "updatedAt": "2026-01-15T10:30:00Z",
  "url": "https://example.com",
  "workspace": "string"
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
