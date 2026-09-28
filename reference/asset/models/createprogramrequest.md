# CreateProgramRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `channel` | string | Yes | Channel of the program |  |
| `costs` | array of [`CostRequest`](./costrequest.md) | No | Lists of associated period costs |  |
| `description` | string | No |  |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `name` | string | Yes | Name of the program |  |
| `tags` | array of [`TagRequest`](./tagrequest.md) | No | List of associated program tags |  |
| `type` | string | Yes | Type of the program |  |

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
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "name": "Example name",
  "tags": [
    {
      "tagType": "string",
      "tagValue": "string"
    }
  ],
  "type": "string"
}
```

## Referenced models

- [`CostRequest`](./costrequest.md)
- [`Folder`](./folder.md)
- [`TagRequest`](./tagrequest.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
