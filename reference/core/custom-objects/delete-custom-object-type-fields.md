# Delete Custom Object Type Fields

**Method:** `POST`  
**Path:** `/rest/v1/customobjects/schema/{apiName}/deleteField.json`  
**Tag:** Custom Objects  
**Operation ID:** `deleteCustomObjectTypeFieldsUsingPOST`  

Deletes fields from custom object type. Required Permissions: Read-Write Custom Object Type

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | Yes | API name of custom object type |  |

### Request body

**Name:** `deleteCustomObjectTypeFieldsRequest`  
**Required:** Yes  
**Schema:** [`DeleteCustomObjectTypeFieldsRequest`](../models/deletecustomobjecttypefieldsrequest.md)

JSON object containing custom object type fields

#### Generated example

```json
{
  "input": [
    {
      "name": "Example name"
    }
  ]
}
```

### Referenced models

- [`DeleteCustomObjectTypeFieldsRequest`](../models/deletecustomobjecttypefieldsrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/customobjects/schema/{{apiName}}/deleteField.json
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "name": "Example name"
    }
  ]
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
