# Create Landing Page Redirect Rule

**Method:** `POST`  
**Path:** `/rest/asset/v1/redirectRules.json`  
**Tag:** Landing Page Redirect Rules  
**Operation ID:** `createLandingPageRedirectRuleUsingPOST`  

Create a new landing page redirect rule. Required Permissions: Read Write Redirect Rules

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Request body

**Name:** `createLandingPageRedirectRuleRequest`  
**Required:** Yes  
**Schema:** [`CreateLandingPageRedirectRuleRequest`](../models/createlandingpageredirectrulerequest.md)

createLandingPageRedirectRuleRequest

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

- [`CreateLandingPageRedirectRuleRequest`](../models/createlandingpageredirectrulerequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/redirectRules.json
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
