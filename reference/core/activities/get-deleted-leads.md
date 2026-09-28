# Get Deleted Leads

**Method:** `GET`  
**Path:** `/rest/v1/activities/deletedleads.json`  
**Tag:** Activities  
**Operation ID:** `getDeletedLeadsUsingGET`  

Returns a list of leads deleted after a given datetime. Deletions greater than 14 days old may be pruned. Required Permissions: Read-Only Activity, Read-Write Activity

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `nextPageToken` | string | Yes | Token representation of a datetime returned by the Get Paging Token endpoint. This endpoint will return activities after this datetime |  |
| `batchSize` | integer (int32) | No | Maximum number of records to return. Maximum and default is 300. |  |

### Example request

```http
GET {{base_url}}/rest/v1/activities/deletedleads.json?nextPageToken={{nextPageToken}}&batchSize={{batchSize}}
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
