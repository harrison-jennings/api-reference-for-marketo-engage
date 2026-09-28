# Get Lead by Id

**Method:** `GET`  
**Path:** `/rest/v1/lead/{leadId}.json`  
**Tag:** Leads  
**Operation ID:** `getLeadByIdUsingGET`  

Retrieves a single lead record through its Marketo id. Required Permissions: Read-Only Lead, Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `leadId` | integer (int64) | Yes | The Marketo lead id |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `fields` | array of string | No | Comma separated list of field names. If omitted, the following default fields will be returned: email, updatedAt, createdAt, lastName, firstName, and id. | collection format: multi |

### Example request

```http
GET {{base_url}}/rest/v1/lead/{{leadId}}.json?fields={{fields}}
Accept: application/json
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
