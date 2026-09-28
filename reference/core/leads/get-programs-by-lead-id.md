# Get Programs by Lead Id

**Method:** `GET`  
**Path:** `/rest/v1/leads/{leadId}/programMembership.json`  
**Tag:** Leads  
**Operation ID:** `getProgramMembershipUsingGET`  

Query program membership for one lead. Required Permissions: Read-Only Asset

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
| `earliestUpdatedAt` | string | No | Exclude programs prior to this date. Must be valid ISO-8601 string. See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |
| `latestUpdatedAt` | string | No | Exclude programs after this date. Must be valid ISO-8601 string. See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |
| `filterType` | string | No | Set to "programId" to filter a set of programs. |  |
| `filterValues` | array of string | No | Comma-separated list of program ids to match against | collection format: multi |

### Example request

```http
GET {{base_url}}/rest/v1/leads/{{leadId}}/programMembership.json?nextPageToken={{nextPageToken}}&batchSize={{batchSize}}&earliestUpdatedAt={{earliestUpdatedAt}}&latestUpdatedAt={{latestUpdatedAt}}&filterType={{filterType}}&filterValues={{filterValues}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfPrograms`](../models/responseofprograms.md)

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
      "acquiredBy": false,
      "isExhausted": false,
      "membershipDate": "string",
      "nurtureCadence": "string",
      "progressionStatus": "string",
      "reachedSuccess": false,
      "stream": "string",
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

- [`ResponseOfPrograms`](../models/responseofprograms.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
