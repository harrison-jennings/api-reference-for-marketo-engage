# Get Auto Suggest for Smart List

**Method:** `GET`  
**Path:** `/rest/asset/v1/smartList/{id}/autoSuggest.json`  
**Tag:** Smart Lists  
**Operation ID:** `getSmartListAutoSuggestUsingGET`  

Returns suggested values for configuring a smart list rule. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | Yes | Id of the smart list |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `ruleTypeId` | string | Yes | JSON representation of the rule type, with members 'id' and 'type' which may be 'activity' or 'attribute', for example {"id":11,"type":"activity"} |  |
| `optionTypeId` | string | Yes | JSON representation of the constraint, with members 'id' and 'type' which may be 'activity' or 'attribute', for example {"id":16,"type":"activity"} |  |
| `primaryAttributeValue` | string | No | Value used to filter suggestions |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/smartList/{{id}}/autoSuggest.json?ruleTypeId={{ruleTypeId}}&optionTypeId={{optionTypeId}}&primaryAttributeValue={{primaryAttributeValue}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfAutoSuggestValue`](../models/responseofautosuggestvalue.md)

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
    [
      {
        "id": 123,
        "displayName": "Example name",
        "name": "Example name",
        "workspace": "string",
        "workspaceId": 123
      }
    ]
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfAutoSuggestValue`](../models/responseofautosuggestvalue.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
