# Get Lists

**Method:** `GET`  
**Path:** `/rest/v1/lists.json`  
**Tag:** Static Lists  
**Operation ID:** `getListsUsingGET`  

Returns a set of static list records based on given filter parameters. Required Permissions: Read-Only Lead, Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | array of integer (int32) | No | Comma-separated list of static list ids to return | collection format: multi |
| `name` | array of string | No | Comma-separated list of static list names to return | collection format: multi |
| `programName` | array of string | No | Comma-separated list of program names. If set will return all static lists that are children of the given programs | collection format: multi |
| `workspaceName` | array of string | No | Comma-separated list of workspace names. If set will return all static lists that are children of the given workspaces | collection format: multi |
| `batchSize` | integer (int32) | No | The batch size to return. The max and default value is 300. |  |
| `nextPageToken` | string | No | A token will be returned by this endpoint if the result set is greater than the batch size and can be passed in a subsequent call through this parameter. See Paging Tokens for more info. |  |

### Example request

```http
GET {{base_url}}/rest/v1/lists.json?id={{id}}&name={{name}}&programName={{programName}}&workspaceName={{workspaceName}}&batchSize={{batchSize}}&nextPageToken={{nextPageToken}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfStaticList`](../models/responseofstaticlist.md)

#### Generated example

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
      "createdAt": "string",
      "description": "string",
      "id": 123,
      "name": "Example name",
      "programName": "Example name",
      "updatedAt": "string",
      "workspaceName": "Example name"
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

### Referenced models

- [`ResponseOfStaticList`](../models/responseofstaticlist.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
