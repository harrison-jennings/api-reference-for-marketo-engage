# ResponseOfProgramResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`ProgramResponse`](./programresponse.md) | No |  |  |
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
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

## Referenced models

- [`Error`](./error.md)
- [`ProgramResponse`](./programresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
