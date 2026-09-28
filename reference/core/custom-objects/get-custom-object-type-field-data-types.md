# Get Custom Object Type Field Data Types

**Method:** `GET`  
**Path:** `/rest/v1/customobjects/schema/fieldDataTypes.json`  
**Tag:** Custom Objects  
**Operation ID:** `getCustomObjectTypeFieldDataTypesUsingGET`  

Returns a list of permissible data types that are assigned to custom object fields. Required Permissions: Read-Only Custom Object Type, Read-Write Custom Object Type

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/v1/customobjects/schema/fieldDataTypes.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfCustomObjectTypeFieldDataTypes`](../models/responseofcustomobjecttypefielddatatypes.md)

#### Generated example

```json
{
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ],
  "requestId": "123",
  "result": [
    "string"
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

- [`ResponseOfCustomObjectTypeFieldDataTypes`](../models/responseofcustomobjecttypefielddatatypes.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
