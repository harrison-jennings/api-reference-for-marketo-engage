# EmailResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `createdAt` | string (date-time) | No | Datetime the asset was created |  |
| `description` | string | No | Description of the asset |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `fromEmail` | [`EmailHeaderField`](./emailheaderfield.md) | Yes | From-address of the Email |  |
| `fromName` | [`EmailHeaderField`](./emailheaderfield.md) | Yes | From-name of the Email |  |
| `id` | integer (int64) | No | Id of the asset |  |
| `name` | string | No | Name of the asset |  |
| `operational` | boolean | Yes | Whether the email is operational. Operational emails bypass unsubscribe status. Defaults to false |  |
| `publishToMSI` | boolean | Yes | Whether the email is published to Marketo Sales Insight |  |
| `replyEmail` | [`EmailHeaderField`](./emailheaderfield.md) | Yes | Reply-To address of the Email |  |
| `status` | string | Yes | Status filter for draft or approved versions |  |
| `subject` | [`EmailHeaderField`](./emailheaderfield.md) | Yes | Subject Line of the Email |  |
| `template` | integer (int32) | Yes | Id of the parent template |  |
| `textOnly` | boolean | Yes | Setting to include text-only version of email when sent |  |
| `updatedAt` | string (date-time) | No | Datetime the asset was most recently updated |  |
| `url` | string | No | Url of the asset in the Marketo UI |  |
| `version` | integer (int32) | No | The type version of the email | enum: 1, 2 |
| `webView` | boolean | Yes | Whether 'View as Webpage' function is enabled for the email |  |
| `workspace` | string | No | Name of the workspace |  |
| `autoCopyToText` | boolean | Yes | Setting to automatically copy HTML version to Text version |  |
| `preHeader` | string | Yes | The email preheader text (max 1024 characters) |  |
| `ccFields` | array of [`EmailCCFields`](./emailccfields.md) | No |  |  |

## Generated example

```json
{
  "createdAt": "2026-01-15T10:30:00Z",
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "fromEmail": {
    "type": "string",
    "value": "string"
  },
  "fromName": {
    "type": "string",
    "value": "string"
  },
  "id": 123,
  "name": "Example name",
  "operational": true,
  "publishToMSI": true,
  "replyEmail": {
    "type": "string",
    "value": "string"
  },
  "status": "string",
  "subject": {
    "type": "string",
    "value": "string"
  },
  "template": 123,
  "textOnly": true,
  "updatedAt": "2026-01-15T10:30:00Z",
  "url": "https://example.com",
  "version": 1,
  "webView": true,
  "workspace": "string",
  "autoCopyToText": true,
  "preHeader": "string",
  "ccFields": [
    {
      "attributeId": "123",
      "objectName": "Example name",
      "displayName": "Example name",
      "apiName": "Example name"
    }
  ]
}
```

## Referenced models

- [`EmailCCFields`](./emailccfields.md)
- [`EmailHeaderField`](./emailheaderfield.md)
- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
