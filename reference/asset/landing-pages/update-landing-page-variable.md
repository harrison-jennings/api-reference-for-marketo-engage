# Update Landing Page Variable

**Method:** `POST`  
**Path:** `/rest/asset/v1/landingPage/{id}/variable/{variableId}.json`  
**Tag:** Landing Pages  
**Operation ID:** `updateLandingPageVariableUsingPOST`  

Updates the value of the given variable. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |
| `variableId` | string | Yes | variableId |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `value` | integer (int32) | Yes | New value of the variable |  |

### Example request

```http
POST {{base_url}}/rest/asset/v1/landingPage/{{id}}/variable/{{variableId}}.json?value={{value}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLandingPageVariableResponse`](../models/responseoflandingpagevariableresponse.md)

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
      "id": "123",
      "type": "string",
      "value": {}
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfLandingPageVariableResponse`](../models/responseoflandingpagevariableresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
