# Sync SalesPersons

**Method:** `POST`  
**Path:** `/rest/v1/salespersons.json`  
**Tag:** Sales Persons  
**Operation ID:** `syncSalesPersonsUsingPOST`  

Allows inserts, updates, or upserts of salespersons to the target instance. Required Permissions: Read-Write Sales Person

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `syncSalesPersonRequest`  
**Required:** Yes  
**Schema:** [`SyncSalesPersonRequest`](../models/syncsalespersonrequest.md)

syncSalesPersonRequest

#### Generated example

```json
{
  "action": "createOnly",
  "dedupeBy": "string",
  "input": [
    {
      "id": 123,
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123,
      "status": "created"
    }
  ]
}
```

### Referenced models

- [`SyncSalesPersonRequest`](../models/syncsalespersonrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/salespersons.json
Content-Type: application/json
Accept: application/json

{
  "action": "createOnly",
  "dedupeBy": "string",
  "input": [
    {
      "id": 123,
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123,
      "status": "created"
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSalesPerson`](../models/responseofsalesperson.md)

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
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123,
      "status": "created"
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

- [`ResponseOfSalesPerson`](../models/responseofsalesperson.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
