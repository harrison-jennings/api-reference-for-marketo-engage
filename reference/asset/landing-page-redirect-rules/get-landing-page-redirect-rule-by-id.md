# Get Landing Page Redirect Rule by Id

**Method:** `GET`  
**Path:** `/rest/asset/v1/redirectRule/{id}.json`  
**Tag:** Landing Page Redirect Rules  
**Operation ID:** `getLandingPageRedirectRuleByIdUsingGET`  

Retrieves the landing page redirect rule record. Required Permissions: Read Only Redirect Rules, Read Write Redirect Rules

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of landing page redirect rule |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/redirectRule/{{id}}.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLandingPageRedirectRules`](../models/responseoflandingpageredirectrules.md)

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
      "redirectFromUrl": "https://example.com",
      "redirectToUrl": "https://example.com",
      "hostname": "Example name",
      "redirectFrom": {
        "type": "landingPageId",
        "value": "string"
      },
      "redirectTo": {
        "type": "landingPageId",
        "value": "string"
      },
      "createdAt": "2026-01-15T10:30:00Z",
      "updatedAt": "2026-01-15T10:30:00Z"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfLandingPageRedirectRules`](../models/responseoflandingpageredirectrules.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
