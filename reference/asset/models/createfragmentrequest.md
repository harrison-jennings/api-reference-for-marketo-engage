# CreateFragmentRequest

**Type:** `object`

Request body for creating a fragment. appData must include at least one of: folderId or workspaceId. settings must include fragmentType and supportedChannels.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes |  |  |
| `description` | string | No |  |  |
| `appData` | [`AppDataDTO`](./appdatadto.md) | Yes |  |  |
| `data` | [`DataDTO`](./datadto.md) | No |  |  |
| `editorContext` | [`EditorContextDto`](./editorcontextdto.md) | No |  |  |
| `settings` | [`FragmentSettingsDTO`](./fragmentsettingsdto.md) | Yes |  |  |

## Generated example

```json
{
  "name": "Example name",
  "description": "string",
  "appData": {
    "editorType": "string",
    "folderId": "123",
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
  "editorContext": {
    "dynamicContent": {}
  },
  "settings": {
    "fragmentType": "string",
    "fragmentSubType": "string",
    "supportedChannels": [
      "string"
    ]
  }
}
```

## Referenced models

- [`AppDataDTO`](./appdatadto.md)
- [`DataDTO`](./datadto.md)
- [`EditorContextDto`](./editorcontextdto.md)
- [`FragmentSettingsDTO`](./fragmentsettingsdto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
