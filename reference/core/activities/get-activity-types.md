# Get Activity Types

**Method:** `GET`  
**Path:** `/rest/v1/activities/types.json`  
**Tag:** Activities  
**Operation ID:** `getAllActivityTypesUsingGET`  

Returns a list of available activity types in the target instance, along with associated metadata of each type. Required Permissions: Read-Only Activity, Read-Write Activity

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/v1/activities/types.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfActivityType`](../models/responseofactivitytype.md)

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
      "apiName": "Example name",
      "attributes": [
        {
          "apiName": "Example name",
          "dataType": "string",
          "name": "Example name"
        }
      ],
      "description": "string",
      "id": 123,
      "name": "Example name",
      "primaryAttribute": {
        "apiName": "Example name",
        "dataType": "string",
        "name": "Example name"
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

- [`ResponseOfActivityType`](../models/responseofactivitytype.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
