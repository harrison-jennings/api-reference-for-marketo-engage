# Update Landing Page Redirect Rule

**Method:** `POST`  
**Path:** `/rest/asset/v1/redirectRule/{id}.json`  
**Tag:** Landing Page Redirect Rules  
**Operation ID:** `updateLandingPageRedirectRuleUsingPOST`  

Update an existing landing page redirect rule. Required Permissions: Read Write Redirect Rules

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of landing page redirect rule |  |

### Request body

**Name:** `updateLandingPageRedirectRuleRequest`  
**Required:** Yes  
**Schema:** [`UpdateLandingPageRedirectRuleRequest`](../models/updatelandingpageredirectrulerequest.md)

updateLandingPageRedirectRuleRequest

#### Generated example

```json
{
  "hostname": "Example name",
  "redirectFrom": {
    "type": "landingPageId",
    "value": "string"
  },
  "redirectTo": {
    "type": "landingPageId",
    "value": "string"
  }
}
```

### Referenced models

- [`UpdateLandingPageRedirectRuleRequest`](../models/updatelandingpageredirectrulerequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/redirectRule/{{id}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "hostname": "Example name",
  "redirectFrom": {
    "type": "landingPageId",
    "value": "string"
  },
  "redirectTo": {
    "type": "landingPageId",
    "value": "string"
  }
}
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
