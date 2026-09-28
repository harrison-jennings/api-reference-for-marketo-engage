# Describe Program Member

**Method:** `GET`  
**Path:** `/rest/v1/program/members/describe.json`  
**Tag:** Leads  
**Operation ID:** `describeProgramMemberUsingGET`  

Returns metadata about program member objects in the target instance, including a list of all fields available for interaction via the APIs. Required Permissions: Read-Only Lead, Read-Write Lead<br><br><b>Note: This endpoint has been superseded.</b>  Use <a href="https://developer.adobe.com/marketo-apis/api/mapi/#operation/describeProgramMemberUsingGET2">Describe Program Member</a> endpoint instead.

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/v1/program/members/describe.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfProgramMemberAttributes`](../models/responseofprogrammemberattributes.md)

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

- [`ResponseOfProgramMemberAttributes`](../models/responseofprogrammemberattributes.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
