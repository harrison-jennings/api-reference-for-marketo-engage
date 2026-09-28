# Describe Lead

**Method:** `GET`  
**Path:** `/rest/v1/leads/describe.json`  
**Tag:** Leads  
**Operation ID:** `describeUsingGET_2`  

Returns metadata about lead objects in the target instance, including a list of all fields available for interaction via the APIs. Required Permissions: Read-Only Lead, Read-Write Lead<br><br><b>Note: This endpoint has been superseded.</b>  Use <a href="https://developer.adobe.com/marketo-apis/api/mapi/#operation/describeUsingGET_6">Describe Lead2</a> endpoint instead.

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/v1/leads/describe.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLeadAttribute`](../models/responseofleadattribute.md)

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
      "dataType": "string",
      "displayName": "Example name",
      "id": 123,
      "length": 123,
      "rest": {
        "name": "Example name",
        "readOnly": false
      },
      "soap": {
        "name": "Example name",
        "readOnly": false
      }
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

- [`ResponseOfLeadAttribute`](../models/responseofleadattribute.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
