# ResponseOfFolderResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`FolderResponse`](./folderresponse.md) | No |  |  |
| `success` | boolean | No |  |  |
| `warnings` | array of string | No |  |  |

## Generated example

```json
{
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ],
  "requestId": "123",
  "result": [
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
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

## Referenced models

- [`Error`](./error.md)
- [`FolderResponse`](./folderresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
