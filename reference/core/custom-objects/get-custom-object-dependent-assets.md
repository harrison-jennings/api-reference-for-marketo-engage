# Get Custom Object Dependent Assets

**Method:** `GET`  
**Path:** `/rest/v1/customobjects/schema/{apiName}/dependentAssets.json`  
**Tag:** Custom Objects  
**Operation ID:** `getCustomObjectTypeDependentAssetsUsingGET`  

Returns a list of dependent assets for a custom object type, including their in-instance location. Required Permissions: Read-Only Custom Object Type, Read-Write Custom Object Type

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | Yes | REST API name for custom object |  |

### Example request

```http
GET {{base_url}}/rest/v1/customobjects/schema/{{apiName}}/dependentAssets.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfObjectDependentAssets`](../models/responseofobjectdependentassets.md)

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
      "assetType": "string",
      "assetId": 123,
      "assetName": "Example name",
      "usedFields": [
        "string"
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

- [`ResponseOfObjectDependentAssets`](../models/responseofobjectdependentassets.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
