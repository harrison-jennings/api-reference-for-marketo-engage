# Sync Custom Object Type

**Method:** `POST`  
**Path:** `/rest/v1/customobjects/schema.json`  
**Tag:** Custom Objects  
**Operation ID:** `syncCustomObjectTypeUsingPOST`  

Inserts, updates, or upserts custom object type record to the target instance. Required Permissions: Read-Write Custom Object Type

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `syncCustomObjectTypeRequest`  
**Required:** Yes  
**Schema:** [`SyncCustomObjectTypeRequest`](../models/synccustomobjecttyperequest.md)

JSON object containing custom object type attributes

#### Generated example

```json
{
  "action": "createOnly",
  "displayName": "Example name",
  "apiName": "Example name",
  "pluralName": "Example name",
  "description": "string",
  "showInLeadDetail": true
}
```

### Referenced models

- [`SyncCustomObjectTypeRequest`](../models/synccustomobjecttyperequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/customobjects/schema.json
Content-Type: application/json
Accept: application/json

{
  "action": "createOnly",
  "displayName": "Example name",
  "apiName": "Example name",
  "pluralName": "Example name",
  "description": "string",
  "showInLeadDetail": true
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfCustomObjectType`](../models/responseofcustomobjecttype.md)

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

- [`ResponseOfCustomObjectType`](../models/responseofcustomobjecttype.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
