# Get Campaigns

**Method:** `GET`  
**Path:** `/rest/v1/campaigns.json`  
**Tag:** Campaigns  
**Operation ID:** `getCampaignsUsingGET`  

Returns a list of campaign records. Required Permissions: Read-Only Campaigns, Read-Write Campaigns<br><br><b>Note: This endpoint has been superseded.</b>  Use <a href="https://developer.adobe.com/marketo-apis/api/asset/#operation/getAllSmartCampaignsGET">Get Smart Campaigns</a> endpoint instead.

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | array of integer (int32) | No | Comma-separated list of campaign ids to return records for | collection format: multi |
| `name` | array of string | No | Comma-separated list of names to filter on | collection format: multi |
| `programName` | array of string | No | Comma-separated list of program names to filter on. If set, will filter to only campaigns which are children of the designated programs. | collection format: multi |
| `workspaceName` | array of string | No | Comma-separated list of workspace names to filter on. If set, will only return campaigns in the given workspaces. | collection format: multi |
| `batchSize` | integer (int32) | No | Maximum number of records to return. Maximum and default is 300. |  |
| `nextPageToken` | string | No | A token will be returned by this endpoint if the result set is greater than the batch size and can be passed in a subsequent call through this parameter. See Paging Tokens for more info. |  |
| `isTriggerable` | boolean | No | Set to true to return active Campaigns which have a Campaign is Requested trigger and source is Web Service API |  |

### Example request

```http
GET {{base_url}}/rest/v1/campaigns.json?id={{id}}&name={{name}}&programName={{programName}}&workspaceName={{workspaceName}}&batchSize={{batchSize}}&nextPageToken={{nextPageToken}}&isTriggerable={{isTriggerable}}
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
