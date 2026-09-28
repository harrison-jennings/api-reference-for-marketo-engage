# ResponseOfLeadByListId

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | Yes | Array of errors that occurred if the request was unsuccessful |  |
| `nextPageToken` | string | No | Paging token given if the result set exceeded the allowed batch size |  |
| `requestId` | string | Yes | Id of the request made |  |
| `result` | array of [`Lead`](./lead.md) | Yes | Array of results for individual records in the operation, may be empty |  |
| `success` | boolean | Yes | Whether the request succeeded |  |
| `warnings` | array of [`Warning`](./warning.md) | Yes | Array of warnings given for the operation |  |

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
  "result": [
    {
      "id": 123,
      "membership": {
        "acquiredBy": false,
        "isExhausted": false,
        "membershipDate": "string",
        "nurtureCadence": "string",
        "progressionStatus": "string",
        "reachedSuccess": false,
        "stream": "string"
      },
      "reason": {
        "code": "string",
        "message": "string"
      },
      "status": "string"
    }
  ],
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
- [`Lead`](./lead.md)
- [`Warning`](./warning.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
