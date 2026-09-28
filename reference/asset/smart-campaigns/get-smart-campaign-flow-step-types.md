# Get Smart Campaign Flow Step Types

**Method:** `GET`  
**Path:** `/rest/asset/v1/smartCampaign/flowStepTypes.json`  
**Tag:** Smart Campaigns  
**Operation ID:** `getSmartCampaignFlowStepTypesUsingGET`  

Returns flow step types with constraint metadata. These are the subset valid for use as flow step choice conditions. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/asset/v1/smartCampaign/flowStepTypes.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSmartCampaignFlowStepType`](../models/responseofsmartcampaignflowsteptype.md)

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
      "flowStepTypes": [
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

- [`ResponseOfSmartCampaignFlowStepType`](../models/responseofsmartcampaignflowsteptype.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
