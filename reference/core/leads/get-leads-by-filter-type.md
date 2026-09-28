# Get Leads by Filter Type

**Method:** `GET`  
**Path:** `/rest/v1/leads.json`  
**Tag:** Leads  
**Operation ID:** `getLeadsByFilterUsingGET`  

Returns a list of up to 300 leads based on a list of values in a particular field. Required Permissions: Read-Only Lead, Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `filterType` | string | Yes | The lead field to filter on. Any custom field (string, email, or integer types only), and any of the following fields are supported: cookies, email, facebookId, id, leadPartitionId, linkedInId, sfdcAccountId, sfdcContactId, sfdcLeadId, sfdcLeadOwnerId, sfdcOpptyId, twitterId.<br><br>A comprehensive list of fields can be obtained via the <a href="http://developers.marketo.com/rest-api/endpoint-reference/lead-database-endpoint-reference/#/Leads/describeUsingGET_6">Describe Lead2</a> endpoint. |  |
| `filterValues` | array of string | Yes | A comma-separated list of values to filter on in the specified fields. | collection format: multi |
| `fields` | array of string | No | A comma-separated list of lead fields to return for each record | collection format: multi |
| `batchSize` | integer (int32) | No | The batch size to return. The max and default value is 300. |  |
| `nextPageToken` | string | No | A token will be returned by this endpoint if the result set is greater than the batch size and can be passed in a subsequent call through this parameter. See Paging Tokens for more info. |  |

### Example request

```http
GET {{base_url}}/rest/v1/leads.json?filterType={{filterType}}&filterValues={{filterValues}}&fields={{fields}}&batchSize={{batchSize}}&nextPageToken={{nextPageToken}}
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
