# Update Filter Logic

**Method:** `POST`  
**Path:** `/rest/asset/v1/smartList/{id}/filterLogic.json`  
**Tag:** Smart Lists  
**Operation ID:** `updateSmartListFilterLogicUsingPOST`  

Updates the filter match type for a smart list. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | Yes | Id of the smart list |  |

### Form-data parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `matchType` | string | Yes | How rules are combined | enum: all, any, custom |
| `customRuleLogic` | string | No | Custom logic expression, for example '1 and (2 or 3)'. Required when matchType is custom |  |

### Example request

```http
POST {{base_url}}/rest/asset/v1/smartList/{{id}}/filterLogic.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

matchType=all
customRuleLogic={{customRuleLogic}}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSmartListResponseWithRules`](../models/responseofsmartlistresponsewithrules.md)

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
      "name": "Example name",
      "description": "string",
      "createdAt": "2026-01-15T10:30:00Z",
      "updatedAt": "2026-01-15T10:30:00Z",
      "url": "https://example.com",
      "folder": {
        "id": 123,
        "type": "Folder"
      },
      "workspace": "string",
      "rules": {
        "filterMatchType": "all",
        "triggers": [
          {
            "id": 123,
            "name": "Example name",
            "ruleTypeId": 123,
            "ruleType": "Activity",
            "operator": "string",
            "conditions": [
              null
            ]
          }
        ],
        "filters": [
          {
            "id": 123,
            "name": "Example name",
            "ruleTypeId": 123,
            "ruleType": "Activity",
            "operator": "string",
            "conditions": [
              null
            ]
          }
        ],
        "filterCustomRuleLogic": "string"
      }
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfSmartListResponseWithRules`](../models/responseofsmartlistresponsewithrules.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
