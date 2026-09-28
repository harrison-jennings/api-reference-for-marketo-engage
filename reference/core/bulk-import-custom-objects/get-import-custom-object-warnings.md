# Get Import Custom Object Warnings

**Method:** `GET`  
**Path:** `/bulk/v1/customobjects/{apiName}/import/{batchId}/warnings.json`  
**Tag:** Bulk Import Custom Objects  
**Operation ID:** `getImportCustomObjectWarningsUsingGET`  

Returns the list of warnings for the import batch job. Required Permissions: Read-Write Custom Object

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
GET {{base_url}}/bulk/v1/customobjects/{{apiName}}/import/{{batchId}}/warnings.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ObservableOfInputStreamContent`](../models/observableofinputstreamcontent.md)

#### Generated example

```json
{}
```

### Referenced models

- [`ObservableOfInputStreamContent`](../models/observableofinputstreamcontent.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
