# Request Campaign

**Method:** `POST`  
**Path:** `/rest/v1/campaigns/{campaignId}/trigger.json`  
**Tag:** Campaigns  
**Operation ID:** `triggerCampaignUsingPOST`  

Passes a set of leads to a trigger campaign to run through the campaign's flow. The designated campaign must have a Campaign is Requested: Web Service API trigger, and must be active. My tokens local to the campaign's parent program can be overridden for the run to customize content. A maximum of 100 leads are allowed per call. Required Permissions: Execute Campaign

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `campaignId` | integer (int32) | Yes | The id of the campaign to trigger |  |

### Request body

**Name:** `triggerCampaignRequest`  
**Required:** No  
**Schema:** [`TriggerCampaignRequest`](../models/triggercampaignrequest.md)

triggerCampaignRequest

#### Generated example

```json
{
  "input": {
    "leads": [
      {
        "id": 123
      }
    ],
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

- [`TriggerCampaignRequest`](../models/triggercampaignrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/campaigns/{{campaignId}}/trigger.json
Content-Type: application/json
Accept: application/json

{
  "input": {
    "leads": [
      {
        "id": 123
      }
    ],
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
