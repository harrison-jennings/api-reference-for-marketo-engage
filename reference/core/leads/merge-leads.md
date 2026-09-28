# Merge Leads

**Method:** `POST`  
**Path:** `/rest/v1/leads/{leadId}/merge.json`  
**Tag:** Leads  
**Operation ID:** `mergeLeadsUsingPOST`  

Merges two or more known lead records into a single lead record. Required Permissions: Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `leadId` | integer (int64) | Yes | The id of the winning lead record |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `leadId` | integer (int64) | No | The id of the losing record |  |
| `leadIds` | array of integer (int64) | No | A comma-separated list of ids of losing records | collection format: multi |
| `mergeInCRM` | boolean | No | If set, will attempt to merge the designated records in a natively-synched CRM. Only valid for instances with are natively synched to SFDC. |  |

### Example request

```http
POST {{base_url}}/rest/v1/leads/{{leadId}}/merge.json?leadId={{leadId}}&leadIds={{leadIds}}&mergeInCRM={{mergeInCRM}}
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
