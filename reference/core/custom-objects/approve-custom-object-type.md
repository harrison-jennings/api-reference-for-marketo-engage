# Approve Custom Object Type

**Method:** `POST`  
**Path:** `/rest/v1/customobjects/schema/{apiName}/approve.json`  
**Tag:** Custom Objects  
**Operation ID:** `approveCustomObjectTypeUsingPOST`  

Approves the current draft of the type, and makes it the live version. This will delete the current live version of the type. Required Permissions: Read-Write Custom Object Type

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | Yes | API Name of the custom object type to approve |  |

### Example request

```http
POST {{base_url}}/rest/v1/customobjects/schema/{{apiName}}/approve.json
Accept: application/json
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
