# Get Custom Object Linkable Objects

**Method:** `GET`  
**Path:** `/rest/v1/customobjects/schema/linkableObjects.json`  
**Tag:** Custom Objects  
**Operation ID:** `getCustomObjectTypeLinkableObjectsUsingGET`  

Returns a list of linkable custom objects and their fields. Required Permissions: Read-Only Custom Object Type, Read-Write Custom Object Type

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/v1/customobjects/schema/linkableObjects.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfObjectLinkableObject`](../models/responseofobjectlinkableobject.md)

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
    {
      "name": "Example name",
      "displayName": "Example name",
      "fields": [
        {
          "name": "Example name",
          "displayName": "Example name",
          "dataType": "string"
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

- [`ResponseOfObjectLinkableObject`](../models/responseofobjectlinkableobject.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
