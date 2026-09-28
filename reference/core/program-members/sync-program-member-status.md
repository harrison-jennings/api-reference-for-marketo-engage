# Sync Program Member Status

**Method:** `POST`  
**Path:** `/rest/v1/programs/{programId}/members/status.json`  
**Tag:** Program Members  
**Operation ID:** `syncProgramMemberStatusUsingPOST`  

Changes the program member status of a list of leads in a target program. If member is not part of the program, member is added to the program. Required Permissions: Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `programId` | integer (int64) | Yes | The id of target program. |  |

### Request body

**Name:** `syncProgramMemberStatusRequest`  
**Required:** Yes  
**Schema:** [`SyncProgramMemberStatusRequest`](../models/syncprogrammemberstatusrequest.md)

syncProgramMemberStatusRequest

#### Generated example

```json
{
  "statusName": "Example name",
  "input": [
    {
      "leadId": 123
    }
  ]
}
```

### Referenced models

- [`SyncProgramMemberStatusRequest`](../models/syncprogrammemberstatusrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/programs/{{programId}}/members/status.json
Content-Type: application/json
Accept: application/json

{
  "statusName": "Example name",
  "input": [
    {
      "leadId": 123
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfProgramMemberStatus`](../models/responseofprogrammemberstatus.md)

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
      "status": "updated",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "leadId": 123,
      "seq": 123
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

- [`ResponseOfProgramMemberStatus`](../models/responseofprogrammemberstatus.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
