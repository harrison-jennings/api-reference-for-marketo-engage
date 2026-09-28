# Get Campaign By Id

**Method:** `GET`  
**Path:** `/rest/v1/campaigns/{campaignId}.json`  
**Tag:** Campaigns  
**Operation ID:** `getCampaignByIdUsingGET`  

Returns the record of a campaign by its id. Required Permissions: Read-Only Campaigns, Read-Write Campaigns<br><br><b>Note: This endpoint has been superseded.</b>  Use <a href="https://developer.adobe.com/marketo-apis/api/asset/#operation/getSmartCampaignByIdUsingGET">Get Smart Campaign by Id</a> endpoint instead.

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `campaignId` | integer (int32) | Yes | campaignId |  |

### Example request

```http
GET {{base_url}}/rest/v1/campaigns/{{campaignId}}.json
Accept: application/json
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
