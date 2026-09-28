# CreateEmailV2Request

**Type:** `object`

Request body for creating an email. appData must include at least one of: folderId, workspaceId, or programId.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes |  |  |
| `description` | string | No |  |  |
| `appData` | [`EmailAppDataDTO`](./emailappdatadto.md) | Yes |  |  |
| `data` | [`DataDTO`](./datadto.md) | No |  |  |
| `headers` | [`EmailHeadersDTO`](./emailheadersdto.md) | Yes |  |  |
| `editorContext` | [`EditorContextDto`](./editorcontextdto.md) | No |  |  |
| `settings` | [`EmailSettingsDTO`](./emailsettingsdto.md) | No |  |  |
| `templateId` | string | No | When provided, the template's content overwrites any data sent in the request. |  |

## Generated example

```json
{
  "name": "Example name",
  "description": "string",
  "appData": {
    "editorType": "string",
    "folderId": "123",
    "programId": "123",
    "workspaceId": "123"
  },
  "data": {
    "html": {
      "body": "string"
    },
    "text": {
      "body": "string",
      "syncFromHtml": true
    }
  },
  "headers": {
    "ccEmails": [
      "person@example.com"
    ],
    "fromEmail": "person@example.com",
    "fromName": "Example name",
    "preheader": "string",
    "replyEmail": "person@example.com",
    "subject": "string"
  },
  "editorContext": {
    "dynamicContent": {}
  },
  "settings": {
    "brandedDomain": "string",
    "dedicatedIp": "string",
    "enableUrlTracking": true,
    "isOperational": true,
    "isTextOnly": true,
    "isWebPageView": true
  },
  "templateId": "123"
}
```

## Referenced models

- [`DataDTO`](./datadto.md)
- [`EditorContextDto`](./editorcontextdto.md)
- [`EmailAppDataDTO`](./emailappdatadto.md)
- [`EmailHeadersDTO`](./emailheadersdto.md)
- [`EmailSettingsDTO`](./emailsettingsdto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
