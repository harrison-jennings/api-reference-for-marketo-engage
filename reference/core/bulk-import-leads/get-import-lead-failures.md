# Get Import Lead Failures

**Method:** `GET`  
**Path:** `/bulk/v1/leads/batch/{batchId}/failures.json`  
**Tag:** Bulk Import Leads  
**Operation ID:** `getImportLeadFailuresUsingGET`  

Returns the list of failures for the import batch job. Required Permissions: Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `batchId` | integer (int32) | Yes | Id of the import batch job. |  |

### Example request

```http
GET {{base_url}}/bulk/v1/leads/batch/{{batchId}}/failures.json
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
