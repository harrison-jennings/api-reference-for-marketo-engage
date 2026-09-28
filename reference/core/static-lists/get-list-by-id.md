# Get List by Id

**Method:** `GET`  
**Path:** `/rest/v1/lists/{listId}.json`  
**Tag:** Static Lists  
**Operation ID:** `getListByIdUsingGET`  

Returns a list record by its id. Required Permissions: Read-Only Lead, Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `listId` | integer (int32) | Yes | Id of the static list to retrieve records from |  |

### Example request

```http
GET {{base_url}}/rest/v1/lists/{{listId}}.json
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
