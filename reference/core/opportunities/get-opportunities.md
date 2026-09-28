# Get Opportunities

**Method:** `GET`  
**Path:** `/rest/v1/opportunities.json`  
**Tag:** Opportunities  
**Operation ID:** `getOpportunitiesUsingGET`  

Returns a list of opportunities based on a filter and set of values. Required Permissions: Read-Only Opportunity, Read-Write Named Opportunity

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `filterType` | string | Yes | Opportunities field to filter on |  |
| `filterValues` | array of string | Yes | Comma-separated list of values to match against | collection format: multi |
| `fields` | array of string | No | Comma-separated list of fields to include in the response | collection format: multi |
| `batchSize` | integer (int32) | No | Maximum number of records to return in the response. Max and default is 300 |  |
| `nextPageToken` | string | No | Paging token returned from a previous response |  |

### Request body

**Name:** `customObjectLookupRequest`  
**Required:** No  
**Schema:** [`LookupCustomObjectRequest`](../models/lookupcustomobjectrequest.md)

customObjectLookupRequest

#### Generated example

```json
{
  "batchSize": 123,
  "fields": [
    "string"
  ],
  "filterType": "string",
  "input": [
    {
      "marketoGUID": "123",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123
    }
  ],
  "nextPageToken": "example-token"
}
```

### Referenced models

- [`LookupCustomObjectRequest`](../models/lookupcustomobjectrequest.md)

### Example request

```http
GET {{base_url}}/rest/v1/opportunities.json?filterType={{filterType}}&filterValues={{filterValues}}&fields={{fields}}&batchSize={{batchSize}}&nextPageToken={{nextPageToken}}
Content-Type: application/json
Accept: application/json

{
  "batchSize": 123,
  "fields": [
    "string"
  ],
  "filterType": "string",
  "input": [
    {
      "marketoGUID": "123",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123
    }
  ],
  "nextPageToken": "example-token"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfCustomObject`](../models/responseofcustomobject.md)

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
      "marketoGUID": "123",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123
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

- [`ResponseOfCustomObject`](../models/responseofcustomobject.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
