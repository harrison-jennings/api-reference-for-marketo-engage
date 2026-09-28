# UsedByItemDTO

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | string | No |  |  |
| `name` | string | No |  |  |
| `appData` | [`AppDataDTO`](./appdatadto.md) | No |  |  |
| `channel` | string | No |  |  |
| `contentType` | string | No |  |  |
| `externalId` | string | No |  |  |

## Generated example

```json
{
  "id": "123",
  "name": "Example name",
  "appData": {
    "editorType": "string",
    "folderId": "123",
    "workspaceId": "123"
  },
  "channel": "string",
  "contentType": "string",
  "externalId": "123"
}
```

## Referenced models

- [`AppDataDTO`](./appdatadto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
