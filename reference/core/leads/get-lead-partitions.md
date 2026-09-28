# Get Lead Partitions

**Method:** `GET`  
**Path:** `/rest/v1/leads/partitions.json`  
**Tag:** Leads  
**Operation ID:** `getLeadPartitionsUsingGET`  

Returns a list of available partitions in the target instance. Required Permissions: Read-Only Lead, Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/v1/leads/partitions.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLeadPartition`](../models/responseofleadpartition.md)

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
      "description": "string",
      "id": 123,
      "name": "Example name"
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

- [`ResponseOfLeadPartition`](../models/responseofleadpartition.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
