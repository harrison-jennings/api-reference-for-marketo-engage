# ProgramResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `channel` | string | Yes | Channel of the program |  |
| `costs` | array of [`Costs`](./costs.md) | Yes | Lists of associated period costs |  |
| `createdAt` | string (date-time) | No | Datetime the asset was created |  |
| `description` | string | No | Description of the asset |  |
| `endDate` | string (date-time) | No | End date of the program. Applicable to event, email, and webinar type programs |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `id` | integer (int64) | No | Id of the asset |  |
| `name` | string | No | Name of the asset |  |
| `sfdcId` | string | No | SFDC id of the program if linked to an SFDC campaign |  |
| `sfdcName` | string | No | Name of the linked SFDC campaign if applicable |  |
| `startDate` | string (date-time) | No | Start date of program. Applicable to event, email and webinar type programs |  |
| `status` | string | Yes | Status of the program. Only valid for Email and engagement program types. | enum: locked, unlocked, on, off |
| `tags` | array of [`Tags`](./tags.md) | Yes | List of associated program tags |  |
| `type` | string | Yes | Type of the program | enum: default, event, webinar, nurture |
| `updatedAt` | string (date-time) | No | Datetime the asset was most recently updated |  |
| `url` | string | No | Url of the asset in the Marketo UI |  |
| `workspace` | string | No | Name of the workspace |  |

## Generated example

```json
{
  "channel": "string",
  "costs": [
    {
      "cost": 123,
      "note": "string",
      "startDate": "2026-01-15T10:30:00Z"
    }
  ],
  "createdAt": "2026-01-15T10:30:00Z",
  "description": "string",
  "endDate": "2026-01-15T10:30:00Z",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "id": 123,
  "name": "Example name",
  "sfdcId": "123",
  "sfdcName": "Example name",
  "startDate": "2026-01-15T10:30:00Z",
  "status": "locked",
  "tags": [
    {
      "tagType": "string",
      "tagValue": "string"
    }
  ],
  "type": "default",
  "updatedAt": "2026-01-15T10:30:00Z",
  "url": "https://example.com",
  "workspace": "string"
}
```

## Referenced models

- [`Costs`](./costs.md)
- [`Folder`](./folder.md)
- [`Tags`](./tags.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
