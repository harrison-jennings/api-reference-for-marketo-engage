# Sync Companies

**Method:** `POST`  
**Path:** `/rest/v1/companies.json`  
**Tag:** Companies  
**Operation ID:** `syncCompaniesUsingPOST`  

Allows inserting, updating, or upserting of company records into Marketo. Required Permissions: Read-Write Company

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `syncCompanyRequest`  
**Required:** Yes  
**Schema:** [`SyncCompanyRequest`](../models/synccompanyrequest.md)

syncCompanyRequest

#### Generated example

```json
{
  "action": "createOnly",
  "dedupeBy": "string",
  "input": [
    {
      "externalCompanyId": "123",
      "id": 123,
      "company": "string"
    }
  ]
}
```

### Referenced models

- [`SyncCompanyRequest`](../models/synccompanyrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/companies.json
Content-Type: application/json
Accept: application/json

{
  "action": "createOnly",
  "dedupeBy": "string",
  "input": [
    {
      "externalCompanyId": "123",
      "id": 123,
      "company": "string"
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfCompany`](../models/responseofcompany.md)

#### Generated example

```json
{
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ],
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

- [`ResponseOfCompany`](../models/responseofcompany.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
