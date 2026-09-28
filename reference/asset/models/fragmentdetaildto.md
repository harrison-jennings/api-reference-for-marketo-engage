# FragmentDetailDTO

**Type:** [`FragmentContentDTO`](./fragmentcontentdto.md)

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | string | No |  |  |
| `name` | string | No |  |  |
| `description` | string | No |  |  |
| `appType` | string | No |  |  |
| `metadata` | [`ContentMetadataDTO`](./contentmetadatadto.md) | No |  |  |
| `settings` | [`FragmentSettingsDTO`](./fragmentsettingsdto.md) | No |  |  |
| `thumbnail` | [`ThumbnailDTO`](./thumbnaildto.md) | No |  |  |
| `status` | string | No |  |  |
| `state` | string | No |  |  |
| `virtualId` | string | No |  |  |
| `associatedStates` | array of [`AssociatedStateDTO`](./associatedstatedto.md) | No |  |  |
| `appData` | [`AppDataDTO`](./appdatadto.md) | No |  |  |
| `externalId` | string | No |  |  |
| `editorContext` | [`EditorContextDto`](./editorcontextdto.md) | No |  |  |
| `scriptEngine` | string | No |  |  |
| `themeId` | string | No |  |  |
| `data` | [`DataDTO`](./datadto.md) | No |  |  |

## Generated example

```json
{
  "id": "123",
  "name": "Example name",
  "description": "string",
  "appType": "string",
  "metadata": {
    "createdBy": "string",
    "createdAt": "string",
    "createdById": "123",
    "createdByAepId": "123",
    "modifiedBy": "string",
    "modifiedAt": "string",
    "modifiedById": "123",
    "modifiedByAepId": "123"
  },
  "settings": {
    "fragmentType": "string",
    "fragmentSubType": "string",
    "supportedChannels": [
      "string"
    ]
  },
  "thumbnail": {
    "url": "https://example.com"
  },
  "status": "string",
  "state": "string",
  "virtualId": "123",
  "associatedStates": [
    {
      "contentId": "123",
      "externalId": "123",
      "state": "string"
    }
  ],
  "appData": {
    "editorType": "string",
    "folderId": "123",
    "workspaceId": "123"
  },
  "externalId": "123",
  "editorContext": {
    "dynamicContent": {}
  },
  "scriptEngine": "string",
  "themeId": "123",
  "data": {
    "html": {
      "body": "string"
    },
    "text": {
      "body": "string",
      "syncFromHtml": true
    }
  }
}
```

## Referenced models

- [`DataDTO`](./datadto.md)
- [`FragmentContentDTO`](./fragmentcontentdto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
