# Remove Rule Constraint

**Method:** `POST`  
**Path:** `/rest/asset/v1/smartList/{id}/rule/{ruleId}/removeConstraint.json`  
**Tag:** Smart Lists  
**Operation ID:** `removeSmartListRuleConstraintUsingPOST`  

Removes a constraint from a rule without deleting the entire rule. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | Yes | Id of the smart list |  |
| `ruleId` | integer (int64) | Yes | Id of the rule |  |

### Form-data parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `attributeId` | string | Yes | JSON representation of the constraint to remove, with members 'id' and 'type' which may be 'activity' or 'attribute', for example {"id":2,"type":"activity"}. 'id' is the id of a constraint of the rule type and 'type' is the type of the rule type, both returned by Get Smart List Rules |  |

### Example request

```http
POST {{base_url}}/rest/asset/v1/smartList/{{id}}/rule/{{ruleId}}/removeConstraint.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

attributeId={{attributeId}}
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
