# Update Program Member Field

**Method:** `POST`  
**Path:** `/rest/v1/programs/members/schema/fields/{fieldApiName}.json`  
**Tag:** Program Members  
**Operation ID:** `updateProgramMemberFieldUsingPOST`  

Update metadata for a program member field in the target instance. See update rules <a href="https://developers.marketo.com/rest-api/lead-database/leads/#update_field">here</a>. Required Permissions: Read-Write Schema Standard Field, Read-Write Schema Custom Field

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `fieldApiName` | string | Yes | The API name of program member field |  |

### Request body

**Name:** `updateLeadFieldRequest`  
**Required:** Yes  
**Schema:** [`UpdateLeadFieldRequest`](../models/updateleadfieldrequest.md)

updateLeadFieldRequest

#### Generated example

```json
{
  "input": [
    {
      "displayName": "Example name",
      "description": "string",
      "isHidden": false,
      "isHtmlEncodingInEmail": false,
      "isSensitive": false
    }
  ]
}
```

### Referenced models

- [`UpdateLeadFieldRequest`](../models/updateleadfieldrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/programs/members/schema/fields/{{fieldApiName}}.json
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "displayName": "Example name",
      "description": "string",
      "isHidden": false,
      "isHtmlEncodingInEmail": false,
      "isSensitive": false
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfUpdateLeadField`](../models/responseofupdateleadfield.md)

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

- [`ResponseOfUpdateLeadField`](../models/responseofupdateleadfield.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
