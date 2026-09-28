# Delete Companies

**Method:** `POST`  
**Path:** `/rest/v1/companies/delete.json`  
**Tag:** Companies  
**Operation ID:** `deleteCompaniesUsingPOST`  

Deletes the included list of company records from the destination instance. Required Permissions: Read-Write Company

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `deleteCompanyRequest`  
**Required:** Yes  
**Schema:** [`DeleteCompanyRequest`](../models/deletecompanyrequest.md)

deleteCompanyRequest

#### Generated example

```json
{
  "deleteBy": "string",
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

- [`DeleteCompanyRequest`](../models/deletecompanyrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/companies/delete.json
Content-Type: application/json
Accept: application/json

{
  "deleteBy": "string",
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
