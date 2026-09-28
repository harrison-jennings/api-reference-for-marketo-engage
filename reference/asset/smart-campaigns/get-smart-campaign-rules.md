# Get Smart Campaign Rules

**Method:** `GET`  
**Path:** `/rest/asset/v1/smartCampaign/rules.json`  
**Tag:** Smart Campaigns  
**Operation ID:** `getSmartCampaignRulesUsingGET`  

Returns all available trigger and filter rule types that can be used in smart campaign smart lists. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/asset/v1/smartCampaign/rules.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSmartCampaignRuleType`](../models/responseofsmartcampaignruletype.md)

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
      "filters": [
        {
          "id": 123,
          "name": "Example name",
          "type": "activity",
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
      ],
      "triggers": [
        {
          "id": 123,
          "name": "Example name",
          "type": "activity",
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
      ],
      "predictiveFilters": {}
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfSmartCampaignRuleType`](../models/responseofsmartcampaignruletype.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
