# Campaign

**Type:** `object`

Record of a Marketo Smart Campaign

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `active` | boolean | No | Whether the campaign is active. Only applicable to trigger campaigns |  |
| `createdAt` | string | Yes | Datetime when the campaign was created |  |
| `description` | string | No | Description of the Smart Campaign |  |
| `id` | integer (int32) | Yes | Unique integer id of the Smart Campaign |  |
| `name` | string | Yes | Name of the Smart Campaign |  |
| `programId` | integer (int32) | No | Id of the parent program if applicable |  |
| `programName` | string | No | Name of the parent program if applicable |  |
| `type` | string | Yes | Type of the Smart Campaign | enum: batch, trigger |
| `updatedAt` | string | Yes | Datetime when the campaign was most recently updated |  |
| `workspaceName` | string | No | Name of the parent workspace if applicable |  |

## Generated example

```json
{
  "active": false,
  "createdAt": "string",
  "description": "string",
  "id": 123,
  "name": "Example name",
  "programId": 123,
  "programName": "Example name",
  "type": "batch",
  "updatedAt": "string",
  "workspaceName": "Example name"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
