# StaticList

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `createdAt` | string | Yes | Datetime when the list was created |  |
| `description` | string | No | Description of the static list |  |
| `id` | integer (int32) | Yes | Unique integer id of the static list |  |
| `name` | string | Yes | Name of the static list |  |
| `programName` | string | No | Name of the program |  |
| `updatedAt` | string | Yes | Datetime when the list was most recently updated |  |
| `workspaceName` | string | No | Name of the parent workspace, if applicable |  |

## Generated example

```json
{
  "createdAt": "string",
  "description": "string",
  "id": 123,
  "name": "Example name",
  "programName": "Example name",
  "updatedAt": "string",
  "workspaceName": "Example name"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
