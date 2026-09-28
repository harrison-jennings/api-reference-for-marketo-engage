# ResponseOfActivityType

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | Yes | Array of errors that occurred if the request was unsuccessful |  |
| `moreResult` | boolean | No | Boolean indicating if there are more results in subsequent pages |  |
| `nextPageToken` | string | No | Paging token given if the result set exceeded the allowed batch size |  |
| `requestId` | string | Yes | Id of the request made |  |
| `result` | array of [`ActivityType`](./activitytype.md) | Yes | Array of results for individual records in the operation, may be empty |  |
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
  "moreResult": false,
  "nextPageToken": "example-token",
  "requestId": "123",
  "result": [
    {
      "apiName": "Example name",
      "attributes": [
        {
          "apiName": "Example name",
          "dataType": "string",
          "name": "Example name"
        }
      ],
      "description": "string",
      "id": 123,
      "name": "Example name",
      "primaryAttribute": {
        "apiName": "Example name",
        "dataType": "string",
        "name": "Example name"
      }
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

- [`ActivityType`](./activitytype.md)
- [`Error`](./error.md)
- [`Warning`](./warning.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
