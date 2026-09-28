# EmailTemplateContentDTO

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | string | No |  |  |
| `name` | string | No |  |  |
| `description` | string | No |  |  |
| `appType` | string | No |  |  |
| `metadata` | [`ContentMetadataDTO`](./contentmetadatadto.md) | No |  |  |
| `status` | string | No |  |  |
| `state` | string | No |  |  |
| `virtualId` | string | No |  |  |
| `associatedStates` | array of [`AssociatedStateDTO`](./associatedstatedto.md) | No |  |  |
| `version` | integer (int32) | No |  |  |
| `appData` | [`AppDataDTO`](./appdatadto.md) | No |  |  |
| `externalId` | string | No |  |  |
| `scriptEngine` | string | No |  |  |

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
  "version": 123,
  "appData": {
    "editorType": "string",
    "folderId": "123",
    "workspaceId": "123"
  },
  "externalId": "123",
  "scriptEngine": "string"
}
```

## Referenced models

- [`AppDataDTO`](./appdatadto.md)
- [`AssociatedStateDTO`](./associatedstatedto.md)
- [`ContentMetadataDTO`](./contentmetadatadto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
