# Get Lead Activities

**Method:** `GET`  
**Path:** `/rest/v1/activities.json`  
**Tag:** Activities  
**Operation ID:** `getLeadActivitiesUsingGET`  

Returns a list of activities from after a datetime given by the `nextPageToken` parameter. Also allows for filtering by lead static list membership, or by a list of up to 30 lead ids. Beginning 2026-09-30, calls to the `Get Lead Activities` and `Get Lead Changes` endpoints which includes the `listId` parameter will fail (error code 1003) if the target lists contain 10,000 or more leads. To avoid service disruptions, ensure that calls are properly scoped to avoid this limit. Required Permissions: Read-Only Activity, Read-Write Activity

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `nextPageToken` | string | Yes | Token representation of a datetime returned by the Get Paging Token endpoint. This endpoint will return activities after this datetime |  |
| `activityTypeIds` | array of integer (int32) | Yes | Comma-separated list of activity type ids. These can be retrieved with the Get Activity Types API. | collection format: multi |
| `assetIds` | array of integer (int32) | No | Id of the primary asset for an activity. This is based on the primary asset id of a given activity type. Should only be used when a single activity type is set | collection format: multi |
| `listId` | integer (int32) | No | Id of a static list. If set, will only return activities of members of this static list. |  |
| `leadIds` | array of integer (int64) | No | Comma-separated list of lead ids. If set, will only return activities of the leads with these ids. Allows up to 30 entries. | collection format: multi |
| `batchSize` | integer (int32) | No | Maximum number of records to return. Maximum and default is 300. |  |

### Example request

```http
GET {{base_url}}/rest/v1/activities.json?nextPageToken={{nextPageToken}}&activityTypeIds={{activityTypeIds}}&assetIds={{assetIds}}&listId={{listId}}&leadIds={{leadIds}}&batchSize={{batchSize}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfActivity`](../models/responseofactivity.md)

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
      "id": 123,
      "leadId": 123,
      "marketoGUID": "123",
      "primaryAttributeValue": "string",
      "primaryAttributeValueId": 123
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

- [`ResponseOfActivity`](../models/responseofactivity.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
