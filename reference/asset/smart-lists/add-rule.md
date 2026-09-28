# Add Rule

**Method:** `POST`  
**Path:** `/rest/asset/v1/smartList/{id}/rules.json`  
**Tag:** Smart Lists  
**Operation ID:** `addSmartListRuleUsingPOST`  

Adds a rule to a smart list. Required Permissions: Read-Write Assets

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
| `ruleId` | string | Yes | JSON representation of the rule type, with members 'id' and 'type' which may be 'activity' or 'attribute', for example {"id":11,"type":"activity"}. Rule types are returned by Get Smart List Rules |  |
| `index` | integer (int32) | Yes | 1-based position to insert the rule |  |
| `trigger` | boolean | No | Set true for a trigger rule. Default false |  |
| `negative` | boolean | No | Set true to negate the rule. Default false |  |

### Example request

```http
POST {{base_url}}/rest/asset/v1/smartList/{{id}}/rules.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

ruleId={{ruleId}}
index={{index}}
trigger={{trigger}}
negative={{negative}}
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
