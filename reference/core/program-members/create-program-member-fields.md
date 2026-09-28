# Create Program Member Fields

**Method:** `POST`  
**Path:** `/rest/v1/programs/members/schema/fields.json`  
**Tag:** Program Members  
**Operation ID:** `createProgramMemberFieldUsingPOST`  

Create program member fields in the target instance. Required Permissions: Read-Write Schema Custom Field

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `createLeadFieldRequest`  
**Required:** Yes  
**Schema:** [`CreateLeadFieldRequest`](../models/createleadfieldrequest.md)

createLeadFieldRequest

#### Generated example

```json
{
  "input": [
    {
      "displayName": "Example name",
      "name": "Example name",
      "description": "string",
      "dataType": "boolean",
      "isHidden": false,
      "isHtmlEncodingInEmail": false,
      "isSensitive": false
    }
  ]
}
```

### Referenced models

- [`CreateLeadFieldRequest`](../models/createleadfieldrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/programs/members/schema/fields.json
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "displayName": "Example name",
      "name": "Example name",
      "description": "string",
      "dataType": "boolean",
      "isHidden": false,
      "isHtmlEncodingInEmail": false,
      "isSensitive": false
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfCreateLeadField`](../models/responseofcreateleadfield.md)

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

- [`ResponseOfCreateLeadField`](../models/responseofcreateleadfield.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
