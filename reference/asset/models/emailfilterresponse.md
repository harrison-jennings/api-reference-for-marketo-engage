# EmailFilterResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `success` | boolean | No |  |  |
| `requestId` | string | No |  |  |
| `result` | [`EmailFilterResult`](./emailfilterresult.md) | No |  |  |

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
          "isOperational": true,
          "isWebPageView": true,
          "isTextOnly": true,
          "disableOpenTracking": true,
          "enableUrlTracking": true
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
          "workspaceId": "123",
          "folderId": "123",
          "programId": "123",
          "programName": "Example name",
          "programType": "string"
        },
        "templateId": "123",
        "externalId": "123",
        "editorContext": {
          "dynamicContent": {}
        },
        "scriptEngine": "string"
      }
    ]
  }
}
```

## Referenced models

- [`EmailFilterResult`](./emailfilterresult.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
