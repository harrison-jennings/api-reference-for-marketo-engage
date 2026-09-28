# Get Program Member Field by Name

**Method:** `GET`  
**Path:** `/rest/v1/programs/members/schema/fields/{fieldApiName}.json`  
**Tag:** Program Members  
**Operation ID:** `getProgramMemberFieldByNameUsingGET`  

Retrieves metadata for single program member field. Required Permissions: Read-Write Schema Standard Field, Read-Write Schema Custom Field

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `fieldApiName` | string | Yes | The API name of program member field |  |

### Example request

```http
GET {{base_url}}/rest/v1/programs/members/schema/fields/{{fieldApiName}}.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLeadField`](../models/responseofleadfield.md)

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
      "displayName": "Example name",
      "name": "Example name",
      "description": "string",
      "dataType": "string",
      "length": 123,
      "isHidden": false,
      "isHtmlEncodingInEmail": false,
      "isSensitive": false,
      "isCustom": false,
      "isApiCreated": false
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

- [`ResponseOfLeadField`](../models/responseofleadfield.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
