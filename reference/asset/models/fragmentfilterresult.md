# FragmentFilterResult

**Type:** [`PageDetailsDTO`](./pagedetailsdto.md)

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `totalItems` | integer (int32) | No |  |  |
| `pageSize` | integer (int32) | No |  |  |
| `currentPage` | integer (int32) | No |  |  |
| `items` | array of [`FragmentContentDTO`](./fragmentcontentdto.md) | No |  |  |

## Generated example

```json
{
  "totalItems": 123,
  "pageSize": 123,
  "currentPage": 123,
  "items": [
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
      "themeId": "123"
    }
  ]
}
```

## Referenced models

- [`FragmentContentDTO`](./fragmentcontentdto.md)
- [`PageDetailsDTO`](./pagedetailsdto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
