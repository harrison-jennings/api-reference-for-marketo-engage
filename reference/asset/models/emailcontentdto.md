# EmailContentDTO

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | string | No |  |  |
| `name` | string | No |  |  |
| `description` | string | No |  |  |
| `appType` | string | No |  |  |
| `headers` | [`EmailHeadersDTO`](./emailheadersdto.md) | No |  |  |
| `metadata` | [`ContentMetadataDTO`](./contentmetadatadto.md) | No |  |  |
| `settings` | [`EmailSettingsResponseDTO`](./emailsettingsresponsedto.md) | No |  |  |
| `status` | string | No |  |  |
| `state` | string | No |  |  |
| `virtualId` | string | No |  |  |
| `associatedStates` | array of [`AssociatedStateDTO`](./associatedstatedto.md) | No |  |  |
| `appData` | [`EmailAppDataResponseDTO`](./emailappdataresponsedto.md) | No |  |  |
| `templateId` | string | No |  |  |
| `externalId` | string | No |  |  |
| `editorContext` | [`EditorContextDto`](./editorcontextdto.md) | No |  |  |
| `scriptEngine` | string | No |  |  |

## Generated example

```json
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
```

## Referenced models

- [`AssociatedStateDTO`](./associatedstatedto.md)
- [`ContentMetadataDTO`](./contentmetadatadto.md)
- [`EditorContextDto`](./editorcontextdto.md)
- [`EmailAppDataResponseDTO`](./emailappdataresponsedto.md)
- [`EmailHeadersDTO`](./emailheadersdto.md)
- [`EmailSettingsResponseDTO`](./emailsettingsresponsedto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
