# Sync Program Member Data

**Method:** `POST`  
**Path:** `/rest/v1/programs/{programId}/members.json`  
**Tag:** Program Members  
**Operation ID:** `syncProgramMemberDataUsingPOST`  

Changes the program member data of a list of leads in a target program. Only existing members of the program may have their data changed with this API. Required Permissions: Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `programId` | integer (int64) | Yes | The id of target program. |  |

### Request body

**Name:** `syncProgramMemberDataRequest`  
**Required:** Yes  
**Schema:** [`SyncProgramMemberDataRequest`](../models/syncprogrammemberdatarequest.md)

syncProgramMemberDataRequest

#### Generated example

```json
{
  "input": [
    {
      "leadId": 123,
      "{fieldApiName}": "Example name",
      "{fieldApiName2}": "Example name"
    }
  ]
}
```

### Referenced models

- [`SyncProgramMemberDataRequest`](../models/syncprogrammemberdatarequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/programs/{{programId}}/members.json
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "leadId": 123,
      "{fieldApiName}": "Example name",
      "{fieldApiName2}": "Example name"
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfProgramMemberData`](../models/responseofprogrammemberdata.md)

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

- [`ResponseOfProgramMemberData`](../models/responseofprogrammemberdata.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
