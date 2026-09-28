# Update Custom Object Type Field

**Method:** `POST`  
**Path:** `/rest/v1/customobjects/schema/{apiName}/{fieldApiName}/updateField.json`  
**Tag:** Custom Objects  
**Operation ID:** `updateCustomObjectTypeFieldUsingPOST`  

Updates a field in custom object type. Required Permissions: Read-Write Custom Object Type

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | Yes | API name of custom object type |  |
| `fieldApiName` | string | Yes | API name of custom object type field |  |

### Request body

**Name:** `updateCustomObjectTypeFieldRequest`  
**Required:** Yes  
**Schema:** [`UpdateCustomObjectTypeFieldRequest`](../models/updatecustomobjecttypefieldrequest.md)

JSON object containing custom object type fields

#### Generated example

```json
{
  "name": "Example name",
  "displayName": "Example name",
  "dataType": "string",
  "description": "string",
  "isDedupeField": true,
  "relatedTo": {
    "name": "Example name",
    "field": "string"
  }
}
```

### Referenced models

- [`UpdateCustomObjectTypeFieldRequest`](../models/updatecustomobjecttypefieldrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/customobjects/schema/{{apiName}}/{{fieldApiName}}/updateField.json
Content-Type: application/json
Accept: application/json

{
  "name": "Example name",
  "displayName": "Example name",
  "dataType": "string",
  "description": "string",
  "isDedupeField": true,
  "relatedTo": {
    "name": "Example name",
    "field": "string"
  }
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
