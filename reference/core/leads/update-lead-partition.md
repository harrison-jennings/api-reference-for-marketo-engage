# Update Lead Partition

**Method:** `POST`  
**Path:** `/rest/v1/leads/partitions.json`  
**Tag:** Leads  
**Operation ID:** `updatePartitionsUsingPOST`  

Updates the lead partition for a list of leads. Required Permissions: Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `updateLeadPartitionRequest`  
**Required:** Yes  
**Schema:** [`UpdateLeadPartitionRequest`](../models/updateleadpartitionrequest.md)

updateLeadPartitionRequest

#### Generated example

```json
{
  "input": [
    {
      "id": 123,
      "partitionName": "Example name"
    }
  ]
}
```

### Referenced models

- [`UpdateLeadPartitionRequest`](../models/updateleadpartitionrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/leads/partitions.json
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "id": 123,
      "partitionName": "Example name"
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
