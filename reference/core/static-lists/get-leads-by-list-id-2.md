# Get Leads By List Id

**Method:** `GET`  
**Path:** `/rest/v1/lists/{listId}/leads.json`  
**Tag:** Static Lists  
**Operation ID:** `getLeadsByListIdUsingGET_1`  

Retrieves person records which are members of the given static list. Required Permissions: Read-Only Lead, Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `listId` | integer (int32) | Yes | Id of the static list to retrieve records from |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `fields` | array of string | No | Comma-separated list of lead fields to return for each record. If unset will return email, updatedAt, createdAt, lastName, firstName and id | collection format: multi |
| `batchSize` | integer (int32) | No | The batch size to return. The max and default value is 300. |  |
| `nextPageToken` | string | No | A token will be returned by this endpoint if the result set is greater than the batch size and can be passed in a subsequent call through this parameter. See Paging Tokens for more info. |  |

### Example request

```http
GET {{base_url}}/rest/v1/lists/{{listId}}/leads.json?fields={{fields}}&batchSize={{batchSize}}&nextPageToken={{nextPageToken}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLead`](../models/responseoflead.md)

#### Generated example

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

### Referenced models

- [`ResponseOfLead`](../models/responseoflead.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
