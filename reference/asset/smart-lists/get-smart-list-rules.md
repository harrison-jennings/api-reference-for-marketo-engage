# Get Smart List Rules

**Method:** `GET`  
**Path:** `/rest/asset/v1/smartList/rules.json`  
**Tag:** Smart Lists  
**Operation ID:** `getSmartListRulesUsingGET`  

Returns all available filter rule types that can be used in smart lists. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/rest/asset/v1/smartList/rules.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSmartListRuleType`](../models/responseofsmartlistruletype.md)

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

- [`ResponseOfSmartListRuleType`](../models/responseofsmartlistruletype.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
