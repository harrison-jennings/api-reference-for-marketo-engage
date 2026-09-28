# Describe Lead2

**Method:** `GET`  
**Path:** `/rest/v1/leads/describe2.json`  
**Tag:** Leads  
**Operation ID:** `describeUsingGET_6`  

Returns list of searchable fields on lead objects in the target instance. Required Permissions: Read-Only Lead, Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/v1/leads/describe2.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLeadAttribute2`](../models/responseofleadattribute2.md)

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
      "name": "Example name",
      "searchableFields": [
        [
          "string"
        ]
      ],
      "fields": [
        {
          "name": "Example name",
          "displayName": "Example name",
          "dataType": "string",
          "length": 123,
          "updateable": true,
          "crmManaged": true
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

- [`ResponseOfLeadAttribute2`](../models/responseofleadattribute2.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
