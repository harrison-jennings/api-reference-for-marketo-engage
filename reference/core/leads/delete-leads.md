# Delete Leads

**Method:** `POST`  
**Path:** `/rest/v1/leads/delete.json`  
**Tag:** Leads  
**Operation ID:** `deleteLeadsUsingPOST`  

Delete a list of leads from the destination instance. Required Permissions: Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | array of integer (int64) | No | Parameter can be specified if the request body is empty. Multiple lead ids can be specified. e.g. id=1,2,3,2342 | collection format: multi |

### Request body

**Name:** `deleteLeadRequest`  
**Required:** No  
**Schema:** [`DeleteLeadRequest`](../models/deleteleadrequest.md)

deleteLeadRequest

#### Generated example

```json
{
  "input": [
    {
      "id": 123
    }
  ]
}
```

### Referenced models

- [`DeleteLeadRequest`](../models/deleteleadrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/leads/delete.json?id={{id}}
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "id": 123
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLead`](../models/responseoflead.md)

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
      "membership": {
        "acquiredBy": false,
        "isExhausted": false,
        "membershipDate": "string",
        "nurtureCadence": "string",
        "progressionStatus": "string",
        "reachedSuccess": false,
        "stream": "string"
      },
      "reason": {
        "code": "string",
        "message": "string"
      },
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

- [`ResponseOfLead`](../models/responseoflead.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
