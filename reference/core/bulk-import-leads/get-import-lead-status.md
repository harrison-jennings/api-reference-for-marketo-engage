# Get Import Lead Status

**Method:** `GET`  
**Path:** `/bulk/v1/leads/batch/{batchId}.json`  
**Tag:** Bulk Import Leads  
**Operation ID:** `getImportLeadStatusUsingGET`  

Returns the status of an import batch job. Required Permissions: Read-Write Lead

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
GET {{base_url}}/bulk/v1/leads/batch/{{batchId}}.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfImportLeadResponse`](../models/responseofimportleadresponse.md)

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
      "importId": "123",
      "message": "string",
      "numOfLeadsProcessed": 123,
      "numOfRowsFailed": 123,
      "numOfRowsWithWarning": 123,
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

- [`ResponseOfImportLeadResponse`](../models/responseofimportleadresponse.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
