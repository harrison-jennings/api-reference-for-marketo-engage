# Delete Rule

**Method:** `POST`  
**Path:** `/rest/asset/v1/smartList/{id}/rule/{ruleId}/delete.json`  
**Tag:** Smart Lists  
**Operation ID:** `deleteSmartListRuleUsingPOST`  

Deletes a single rule from a smart list. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | Yes | Id of the smart list |  |
| `ruleId` | integer (int64) | Yes | Id of the rule |  |

### Example request

```http
POST {{base_url}}/rest/asset/v1/smartList/{{id}}/rule/{{ruleId}}/delete.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfIdResponse`](../models/responseofidresponse.md)

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
      "id": 123
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfIdResponse`](../models/responseofidresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
