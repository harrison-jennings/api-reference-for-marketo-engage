# Schedule Campaign

**Method:** `POST`  
**Path:** `/rest/v1/campaigns/{campaignId}/schedule.json`  
**Tag:** Campaigns  
**Operation ID:** `scheduleCampaignUsingPOST`  

Remotely schedules a batch campaign to run at a given time. My tokens local to the campaign's parent program can be overridden for the run to customize content. When using the "cloneToProgramName" parameter described below, this endpoint is limited to 20 calls per day. Required Permissions: Execute Campaign

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `campaignId` | integer (int32) | Yes | Id of the batch campaign to schedule. |  |

### Request body

**Name:** `scheduleCampaignRequest`  
**Required:** No  
**Schema:** [`ScheduleCampaignRequest`](../models/schedulecampaignrequest.md)

scheduleCampaignRequest

#### Generated example

```json
{
  "input": {
    "cloneToProgramName": "Example name",
    "runAt": "2026-01-15T10:30:00Z",
    "tokens": [
      {
        "name": "Example name",
        "value": "string"
      }
    ]
  }
}
```

### Referenced models

- [`ScheduleCampaignRequest`](../models/schedulecampaignrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/campaigns/{{campaignId}}/schedule.json
Content-Type: application/json
Accept: application/json

{
  "input": {
    "cloneToProgramName": "Example name",
    "runAt": "2026-01-15T10:30:00Z",
    "tokens": [
      {
        "name": "Example name",
        "value": "string"
      }
    ]
  }
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfCampaign`](../models/responseofcampaign.md)

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
  "result": [
    {
      "active": false,
      "createdAt": "string",
      "description": "string",
      "id": 123,
      "name": "Example name",
      "programId": 123,
      "programName": "Example name",
      "type": "batch",
      "updatedAt": "string",
      "workspaceName": "Example name"
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

- [`ResponseOfCampaign`](../models/responseofcampaign.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
