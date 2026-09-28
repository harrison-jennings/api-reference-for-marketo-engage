# EmailTemplateFilterResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `success` | boolean | No |  |  |
| `requestId` | string | No |  |  |
| `result` | [`EmailTemplateFilterResult`](./emailtemplatefilterresult.md) | No |  |  |

## Generated example

```json
{
  "success": true,
  "requestId": "123",
  "result": {
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
    ]
  }
}
```

## Referenced models

- [`EmailTemplateFilterResult`](./emailtemplatefilterresult.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
