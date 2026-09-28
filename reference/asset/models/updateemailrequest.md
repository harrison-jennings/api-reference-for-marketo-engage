# UpdateEmailRequest

**Type:** `object`

Request body for updating an email.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | No |  |  |
| `description` | string | No |  |  |
| `data` | [`DataDTO`](./datadto.md) | No |  |  |
| `headers` | [`UpdateEmailHeadersDTO`](./updateemailheadersdto.md) | No |  |  |
| `editorContext` | [`EditorContextDto`](./editorcontextdto.md) | No |  |  |
| `settings` | [`EmailSettingsDTO`](./emailsettingsdto.md) | No |  |  |
| `templateId` | string | No | When provided, the template's content overwrites both the email's existing content and any data sent in the request. |  |

## Generated example

```json
{
  "name": "Example name",
  "description": "string",
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
- [`EmailSettingsDTO`](./emailsettingsdto.md)
- [`UpdateEmailHeadersDTO`](./updateemailheadersdto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
