# Describe Program Member

**Method:** `GET`  
**Path:** `/rest/v1/programs/members/describe.json`  
**Tag:** Program Members  
**Operation ID:** `describeProgramMemberUsingGET2`  

Returns metadata about program member objects in the target instance, including a list of all fields available for interaction via the APIs. Required Permissions: Read-Only Lead, Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/v1/programs/members/describe.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfProgramMemberAttributes2`](../models/responseofprogrammemberattributes2.md)

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
      "description": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "dedupeFields": [
        "string"
      ],
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

- [`ResponseOfProgramMemberAttributes2`](../models/responseofprogrammemberattributes2.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
