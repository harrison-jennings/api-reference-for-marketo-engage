# Get Paging Token

**Method:** `GET`  
**Path:** `/rest/v1/activities/pagingtoken.json`  
**Tag:** Activities  
**Operation ID:** `getActivitiesPagingTokenUsingGET`  

Returns a paging token for use in retrieving activities and data value changes. Required Permissions: Read-Only Activity, Read-Write Activity

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `sinceDatetime` | string (date-time) | Yes | Earliest datetime to retrieve activities from |  |

### Example request

```http
GET {{base_url}}/rest/v1/activities/pagingtoken.json?sinceDatetime={{sinceDatetime}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfVoid`](../models/responseofvoid.md)

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

- [`ResponseOfVoid`](../models/responseofvoid.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
