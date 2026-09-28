# Get Lead Changes

**Method:** `GET`  
**Path:** `/rest/v1/activities/leadchanges.json`  
**Tag:** Activities  
**Operation ID:** `getLeadChangesUsingGET`  

Returns a list of Data Value Changes and New Lead activities after a given datetime. Beginning 2026-09-30, calls to the `Get Lead Activities` and `Get Lead Changes` endpoints which includes the `listId` parameter will fail (error code 1003) if the target lists contain 10,000 or more leads. To avoid service disruptions, ensure that calls are properly scoped to avoid this limit. Required Permissions: Read-Only Activity, Read-Write Activity

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `nextPageToken` | string | Yes | Token representation of a datetime returned by the Get Paging Token endpoint. This endpoint will return activities after this datetime |  |
| `fields` | array of string | Yes | Comma-separated list of field names to return changes for. Field names can be retrieved with the Describe Lead API. | collection format: multi |
| `listId` | integer (int32) | No | Id of a static list. If set, will only return activities of members of this static list. |  |
| `leadIds` | array of integer (int64) | No | Comma-separated list of lead ids. If set, will only return activities of the leads with these ids. Allows up to 30 entries. | collection format: multi |
| `batchSize` | integer (int32) | No | Maximum number of records to return. Maximum and default is 300. |  |

### Example request

```http
GET {{base_url}}/rest/v1/activities/leadchanges.json?nextPageToken={{nextPageToken}}&fields={{fields}}&listId={{listId}}&leadIds={{leadIds}}&batchSize={{batchSize}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLeadChange`](../models/responseofleadchange.md)

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
      "activityDate": "2026-01-15T10:30:00Z",
      "activityTypeId": 123,
      "attributes": [
        {
          "apiName": "Example name",
          "name": "Example name",
          "value": {}
        }
      ],
      "campaignId": 123,
      "fields": [
        {
          "id": 123,
          "name": "Example name",
          "newValue": "string",
          "oldValue": "string"
        }
      ],
      "id": 123,
      "leadId": 123,
      "marketoGUID": "123"
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

- [`ResponseOfLeadChange`](../models/responseofleadchange.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
