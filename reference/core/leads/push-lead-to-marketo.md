# Push Lead to Marketo

**Method:** `POST`  
**Path:** `/rest/v1/leads/push.json`  
**Tag:** Leads  
**Operation ID:** `pushToMarketoUsingPOST`  

Upserts a lead and generates a Push Lead to Marketo activity. Required Permissions: Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `pushLeadToMarketoRequest`  
**Required:** Yes  
**Schema:** [`PushLeadToMarketoRequest`](../models/pushleadtomarketorequest.md)

pushLeadToMarketoRequest

#### Generated example

```json
{
  "input": [
    {
      "id": 123,
      "reason": {
        "code": "string",
        "message": "string"
      },
      "status": "string"
    }
  ],
  "lookupField": "string",
  "partitionName": "Example name",
  "programName": "Example name",
  "programStatus": "string",
  "reason": "string",
  "source": "string"
}
```

### Referenced models

- [`PushLeadToMarketoRequest`](../models/pushleadtomarketorequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/leads/push.json
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "id": 123,
      "reason": {
        "code": "string",
        "message": "string"
      },
      "status": "string"
    }
  ],
  "lookupField": "string",
  "partitionName": "Example name",
  "programName": "Example name",
  "programStatus": "string",
  "reason": "string",
  "source": "string"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfPushLeadToMarketo`](../models/responseofpushleadtomarketo.md)

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

- [`ResponseOfPushLeadToMarketo`](../models/responseofpushleadtomarketo.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
