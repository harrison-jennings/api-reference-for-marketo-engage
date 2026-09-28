# Import Leads

**Method:** `POST`  
**Path:** `/bulk/v1/leads.json`  
**Tag:** Bulk Import Leads  
**Operation ID:** `importLeadUsingPOST`  

Imports a file containing data records into the target instance. Required Permissions: Read-Write Lead

## Formats

- **Request:** `multipart/form-data`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `format` | string | Yes | Import file format. | enum: csv, tsv, ssv |
| `lookupField` | string | No | Field to use for deduplication. Custom fields (string, email, integer), and the following field types are supported: id, cookies, email, twitterId, facebookId, linkedInId, sfdcAccountId, sfdcContactId, sfdcLeadId, sfdcLeadOwnerId, sfdcOpptyId. Default is email.<br>Note: You can use id for update only operations.  |  |
| `partitionName` | string | No | Name of the lead partition to import to. |  |
| `listId` | integer (int32) | No | Id of the static list to import into. |  |

### Form-data parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `file` | file | Yes | File containing the data records to import. |  |

### Example request

```http
POST {{base_url}}/bulk/v1/leads.json?format=csv&lookupField={{lookupField}}&partitionName={{partitionName}}&listId={{listId}}
Content-Type: multipart/form-data
Accept: application/json

file=@./path/to/file
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
