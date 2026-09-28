# Change Lead Program Status

**Method:** `POST`  
**Path:** `/rest/v1/leads/programs/{programId}/status.json`  
**Tag:** Leads  
**Operation ID:** `changeLeadProgramStatusUsingPOST`  

Changes the program status of a list of leads in a target program. Only existing members of the program may have their status changed with this API. Required Permissions: Read-Write Lead<br><br><b>Note: This endpoint has been superseded.</b>  Use <a href="https://developer.adobe.com/marketo-apis/api/mapi/#operation/syncProgramMemberStatusUsingPOST">Sync Program Member Status</a> endpoint instead.

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `programId` | integer (int32) | Yes | The id of target program |  |

### Request body

**Name:** `changeLeadProgramStatusRequest`  
**Required:** Yes  
**Schema:** [`ChangeLeadProgramStatusRequest`](../models/changeleadprogramstatusrequest.md)

changeLeadProgramStatusRequest

#### Generated example

```json
{
  "input": [
    {
      "id": 123
    }
  ],
  "status": "string"
}
```

### Referenced models

- [`ChangeLeadProgramStatusRequest`](../models/changeleadprogramstatusrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/leads/programs/{{programId}}/status.json
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "id": 123
    }
  ],
  "status": "string"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfChangeLeadProgramStatusOutputData`](../models/responseofchangeleadprogramstatusoutputdata.md)

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
      "id": 123,
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
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

- [`ResponseOfChangeLeadProgramStatusOutputData`](../models/responseofchangeleadprogramstatusoutputdata.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
