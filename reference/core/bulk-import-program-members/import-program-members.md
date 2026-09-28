# Import Program Members

**Method:** `POST`  
**Path:** `/bulk/v1/program/{programId}/members/import.json`  
**Tag:** Bulk Import Program Members  
**Operation ID:** `importProgramMemberUsingPOST`  

Imports a file containing data records into the target instance. Required Permissions: Read-Write Lead

## Formats

- **Request:** `multipart/form-data`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `programId` | string | Yes | Id of the program to add members to. |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `programMemberStatus` | string | Yes | Program member status for members being added. |  |
| `format` | string | Yes | Import file format. | enum: CSV, TSV, SSV |

### Form-data parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `file` | file | Yes | File containing the data records to import. |  |

### Example request

```http
POST {{base_url}}/bulk/v1/program/{{programId}}/members/import.json?programMemberStatus={{programMemberStatus}}&format=CSV
Content-Type: multipart/form-data
Accept: application/json

file=@./path/to/file
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfImportProgramMemberResponse`](../models/responseofimportprogrammemberresponse.md)

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
      "batchId": 123,
      "importId": "123",
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

- [`ResponseOfImportProgramMemberResponse`](../models/responseofimportprogrammemberresponse.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
