# Get Lists by Lead Id

**Method:** `GET`  
**Path:** `/rest/v1/leads/{leadId}/listMembership.json`  
**Tag:** Leads  
**Operation ID:** `getListMembershipUsingGET`  

Query static list membership for one lead. Required Permissions: Read-Only Asset

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `leadId` | integer (int64) | Yes | The Marketo lead id |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `nextPageToken` | string | No | A token will be returned by this endpoint if the result set is greater than the batch size and can be passed in a subsequent call through this parameter. See Paging Tokens for more info. |  |
| `batchSize` | integer (int32) | No | Maximum number of records to return. Maximum and default is 300. |  |

### Example request

```http
GET {{base_url}}/rest/v1/leads/{{leadId}}/listMembership.json?nextPageToken={{nextPageToken}}&batchSize={{batchSize}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLists`](../models/responseoflists.md)

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
      "createdAt": "string",
      "listId": 123,
      "updatedAt": "string"
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

- [`ResponseOfLists`](../models/responseoflists.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
