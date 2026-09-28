# UsedByResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `success` | boolean | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`UsedByItemDTO`](./usedbyitemdto.md) | No |  |  |
| `pageDetails` | [`PageDetailsDTO`](./pagedetailsdto.md) | No |  |  |

## Generated example

```json
{
  "success": true,
  "requestId": "123",
  "result": [
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
  ],
  "pageDetails": {
    "totalItems": 123,
    "pageSize": 123,
    "currentPage": 123
  }
}
```

## Referenced models

- [`PageDetailsDTO`](./pagedetailsdto.md)
- [`UsedByItemDTO`](./usedbyitemdto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
