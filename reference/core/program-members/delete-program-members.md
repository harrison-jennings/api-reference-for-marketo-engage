# Delete Program Members

**Method:** `POST`  
**Path:** `/rest/v1/programs/{programId}/members/delete.json`  
**Tag:** Program Members  
**Operation ID:** `deleteProgramMemberUsingPOST`  

Delete a list of members from the destination instance. Required Permissions: Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `programId` | integer (int64) | Yes | The id of target program. |  |

### Request body

**Name:** `deleteProgramMemberRequest`  
**Required:** Yes  
**Schema:** [`DeleteProgramMemberRequest`](../models/deleteprogrammemberrequest.md)

deleteProgramMemberRequest

#### Generated example

```json
{
  "input": [
    {
      "leadId": 123
    }
  ]
}
```

### Referenced models

- [`DeleteProgramMemberRequest`](../models/deleteprogrammemberrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/programs/{{programId}}/members/delete.json
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "leadId": 123
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfProgramMemberDelete`](../models/responseofprogrammemberdelete.md)

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
      "status": "deleted",
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

- [`ResponseOfProgramMemberDelete`](../models/responseofprogrammemberdelete.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
