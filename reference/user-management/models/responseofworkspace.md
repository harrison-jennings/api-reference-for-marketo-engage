# ResponseOfWorkspace

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No | Array of errors that occurred if the request was unsuccessful |  |
| `currencyInfo` | string | Yes | Workspace currency information |  |
| `description` | string | Yes | Workspace description |  |
| `globalViz` | integer (int32) | Yes | Workspace global visualization |  |
| `id` | integer (int32) | Yes | Workspace id |  |
| `name` | string | Yes | Workspace name |  |
| `createdAt` | string | No | Workspace creation time |  |
| `updatedAt` | string | No | Workspace updated time |  |
| `status` | string | Yes | Workspace status |  |

## Generated example

```json
{
  "errors": [
    {
      "code": 123,
      "message": "string"
    }
  ],
  "currencyInfo": "string",
  "description": "string",
  "globalViz": 123,
  "id": 123,
  "name": "Example name",
  "createdAt": "string",
  "updatedAt": "string",
  "status": "string"
}
```

## Referenced models

- [`Error`](./error.md)

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).
