# Delete Opportunity Roles

**Method:** `POST`  
**Path:** `/rest/v1/opportunities/roles/delete.json`  
**Tag:** Opportunities  
**Operation ID:** `deleteOpportunityRolesUsingPOST`  

Deletes a list of opportunities from the target instance. Required Permissions: Read-Write Named Opportunity

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `deleteCustomObjectRequest`  
**Required:** No  
**Schema:** [`DeleteCustomObjectRequest`](../models/deletecustomobjectrequest.md)

deleteCustomObjectRequest

#### Generated example

```json
{
  "deleteBy": "string",
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

- [`DeleteCustomObjectRequest`](../models/deletecustomobjectrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/opportunities/roles/delete.json
Content-Type: application/json
Accept: application/json

{
  "deleteBy": "string",
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
