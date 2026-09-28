# SyncCustomObjectTypeRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `action` | string | No | Type of sync operation to perform. Default is createOrUpdate. | enum: createOnly, updateOnly, createOrUpdate |
| `displayName` | string | Yes | UI display-name of the custom object type |  |
| `apiName` | string | Yes | API name of the custom object type |  |
| `pluralName` | string | No | UI plural-name of the custom object type |  |
| `description` | string | No | Description of the custom object type |  |
| `showInLeadDetail` | boolean | No | Whether to show custom object type in lead detail of UI. Default is false |  |

## Generated example

```json
{
  "action": "createOnly",
  "displayName": "Example name",
  "apiName": "Example name",
  "pluralName": "Example name",
  "description": "string",
  "showInLeadDetail": true
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
