# Discard Custom Object Type Draft

**Method:** `POST`  
**Path:** `/rest/v1/customobjects/schema/{apiName}/discardDraft.json`  
**Tag:** Custom Objects  
**Operation ID:** `discardCustomObjectTypeUsingPOST`  

Discards the current draft of the custom object type. Required Permissions: Read-Write Custom Object Type

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | Yes | API Name of the custom object type draft to discard |  |

### Example request

```http
POST {{base_url}}/rest/v1/customobjects/schema/{{apiName}}/discardDraft.json
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
