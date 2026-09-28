# Sync Opportunity Roles

**Method:** `POST`  
**Path:** `/rest/v1/opportunities/roles.json`  
**Tag:** Opportunities  
**Operation ID:** `syncOpportunityRolesUsingPOST`  

Allows inserts, updates and upserts of Opportunity Role records in the target instance. Required Permissions: Read-Write Named Opportunity

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `syncCustomObjectRequest`  
**Required:** Yes  
**Schema:** [`SyncCustomObjectRequest`](../models/synccustomobjectrequest.md)

syncCustomObjectRequest

#### Generated example

```json
{
  "action": "createOnly",
  "dedupeBy": "string",
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
  ]
}
```

### Referenced models

- [`SyncCustomObjectRequest`](../models/synccustomobjectrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/opportunities/roles.json
Content-Type: application/json
Accept: application/json

{
  "action": "createOnly",
  "dedupeBy": "string",
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
  ]
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
