# Get Import Custom Object Status

**Method:** `GET`  
**Path:** `/bulk/v1/customobjects/{apiName}/import/{batchId}/status.json`  
**Tag:** Bulk Import Custom Objects  
**Operation ID:** `getImportCustomObjectStatusUsingGET`  

Returns the status of an import batch job. Required Permissions: Read-Write Custom Object

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | Yes | API Name of the custom object for the import batch job. |  |
| `batchId` | integer (int32) | Yes | Id of the import batch job. |  |

### Example request

```http
GET {{base_url}}/bulk/v1/customobjects/{{apiName}}/import/{{batchId}}/status.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfImportCustomObjectResponse`](../models/responseofimportcustomobjectresponse.md)

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
      "batchId": 123,
      "importTime": "string",
      "message": "string",
      "numOfObjectsProcessed": 123,
      "numOfRowsFailed": 123,
      "numOfRowsWithWarning": 123,
      "objectApiName": "Example name",
      "operation": "string",
      "status": "string"
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

- [`ResponseOfImportCustomObjectResponse`](../models/responseofimportcustomobjectresponse.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
