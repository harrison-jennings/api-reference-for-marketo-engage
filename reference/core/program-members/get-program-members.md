# Get Program Members

**Method:** `GET`  
**Path:** `/rest/v1/programs/{programId}/members.json`  
**Tag:** Program Members  
**Operation ID:** `getProgramMembersUsingGET`  

Returns a list of up to 300 program members on a list of values in a particular field. If you specify a filterType that is a custom field, the custom field’s dataType must be either “string” or “integer”. If you specify a filterType other than “leadId”, a maximum of 100,000 program member records can be processed by the request. Required Permissions: Read-Only Lead, Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `programId` | integer (int64) | Yes | The id of target program. |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `filterType` | string | Yes | The program member field to filter on. Any custom field (string or integer types only), "updatedAt", or any searchable field. Searchable fields can be obtained via the <a href="/rest-api/endpoint-reference/lead-database-endpoint-reference/#/Leads/describeProgramMemberUsingGET2">Describe Program Member</a> endpoint. |  |
| `filterValues` | array of string | Yes | A comma-separated list of values to filter on in the specified fields. | collection format: multi |
| `startAt` | string | No | When using filterType=updatedAt, the start of date range filter (ISO 8601-format) |  |
| `endAt` | string | No | When using filterType=updatedAt, the end of date range filter (ISO 8601-format) |  |
| `fields` | array of string | No | A comma-separated list of lead fields to return for each record. | collection format: multi |
| `batchSize` | integer (int32) | No | The batch size to return. The max and default value is 300. |  |
| `nextPageToken` | string | No | A token will be returned by this endpoint if the result set is greater than the batch size and can be passed in a subsequent call through this parameter. See Paging Tokens for more info. |  |

### Example request

```http
GET {{base_url}}/rest/v1/programs/{{programId}}/members.json?filterType={{filterType}}&filterValues={{filterValues}}&startAt={{startAt}}&endAt={{endAt}}&fields={{fields}}&batchSize={{batchSize}}&nextPageToken={{nextPageToken}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfProgramMember`](../models/responseofprogrammember.md)

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
      "seq": 123,
      "leadId": 123,
      "reachedSuccess": false,
      "programId": 123,
      "acquiredBy": false,
      "membershipDate": "string"
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

- [`ResponseOfProgramMember`](../models/responseofprogrammember.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
