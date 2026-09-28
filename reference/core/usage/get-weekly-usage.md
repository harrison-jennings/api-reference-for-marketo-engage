# Get Weekly Usage

**Method:** `GET`  
**Path:** `/rest/v1/stats/usage/last7days.json`  
**Tag:** Usage  
**Operation ID:** `getLast7DaysUsageUsingGET`  

Returns the number of calls consumed in the past 7 days. Required Permissions: None

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/v1/stats/usage/last7days.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfUsageData`](../models/responseofusagedata.md)

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
      "date": "2026-01-15T10:30:00Z",
      "total": 123,
      "users": [
        {
          "count": 123,
          "userId": "person@example.com"
        }
      ]
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

- [`ResponseOfUsageData`](../models/responseofusagedata.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
