# ResponseWithoutResult

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No | Array of errors that occurred if the request was unsuccessful |  |
| `nextPageToken` | string | No | Paging token returned from a previous response |  |
| `requestId` | string | Yes | Id of the request made |  |
| `success` | boolean | Yes | Whether the request succeeded |  |
| `warnings` | array of [`Warning`](./warning.md) | No | Array of warnings given for the operation |  |

## Generated example

```json
{
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ],
  "nextPageToken": "example-token",
  "requestId": "123",
  "success": false,
  "warnings": [
    {
      "code": 123,
      "message": "string"
    }
  ]
}
```

## Referenced models

- [`Error`](./error.md)
- [`Warning`](./warning.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
