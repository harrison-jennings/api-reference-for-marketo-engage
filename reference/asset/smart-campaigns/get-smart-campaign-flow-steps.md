# Get Smart Campaign Flow Steps

**Method:** `GET`  
**Path:** `/rest/asset/v1/smartCampaign/flowSteps.json`  
**Tag:** Smart Campaigns  
**Operation ID:** `getSmartCampaignFlowStepsUsingGET`  

Returns all available flow step action types. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/asset/v1/smartCampaign/flowSteps.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSmartCampaignFlowStepActionType`](../models/responseofsmartcampaignflowstepactiontype.md)

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
      "flowSteps": [
        {
          "id": 123,
          "name": "Example name",
          "constraints": [
            {
              "id": null,
              "name": null,
              "dataType": null,
              "primary": null,
              "operator": null,
              "dbAttrib": null,
              "dbAttribId": null,
              "dbObject": null,
              "type": null
            }
          ]
        }
      ]
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfSmartCampaignFlowStepActionType`](../models/responseofsmartcampaignflowstepactiontype.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
