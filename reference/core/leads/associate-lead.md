# Associate Lead

**Method:** `POST`  
**Path:** `/rest/v1/leads/{leadId}/associate.json`  
**Tag:** Leads  
**Operation ID:** `associateLeadUsingPOST`  

Associates a known Marketo lead record to a munchkin cookie and its associated web activity history. Required Permissions: Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `leadId` | integer (int64) | Yes | The id of the lead to associate |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `cookie` | string | Yes | The cookie value to associate |  |

### Example request

```http
POST {{base_url}}/rest/v1/leads/{{leadId}}/associate.json?cookie={{cookie}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseWithoutResult`](../models/responsewithoutresult.md)

#### Generated example

```json
{
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ],
  "nextPageToken": "example-token",
  "requestId": "123",
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

- [`ResponseWithoutResult`](../models/responsewithoutresult.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
