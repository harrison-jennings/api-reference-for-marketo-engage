# Import Custom Objects

**Method:** `POST`  
**Path:** `/bulk/v1/customobjects/{apiName}/import.json`  
**Tag:** Bulk Import Custom Objects  
**Operation ID:** `importCustomObjectUsingPOST`  

Imports a file containing data records into the target instance. Required Permissions: Read-Write Custom Object

## Formats

- **Request:** `multipart/form-data`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | Yes | API Name of the custom object for the import batch job. |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `format` | string | Yes | Import file format. | enum: csv, tsv, ssv |

### Form-data parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `file` | file | Yes | File containing the data records to import. |  |

### Example request

```http
POST {{base_url}}/bulk/v1/customobjects/{{apiName}}/import.json?format=csv
Content-Type: multipart/form-data
Accept: application/json

file=@./path/to/file
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
