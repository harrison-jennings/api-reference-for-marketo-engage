# Get Landing Page Redirect Rules

**Method:** `GET`  
**Path:** `/rest/asset/v1/redirectRules.json`  
**Tag:** Landing Page Redirect Rules  
**Operation ID:** `getLandingPageRedirectRulesUsingGET`  

Retrieves a list of landing page redirect rules from the target instance. Required Permissions: Read Only Redirect Rules, Read Write Redirect Rules

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `maxReturn` | integer (int32) | No | Maximum number of landing page redirect rules to return. Max 200, default 20 |  |
| `offset` | integer (int32) | No | Integer offset for paging |  |
| `redirectTolandingPageId` | string | No | Landing page id of landing page to redirect to |  |
| `redirectToPath` | string | No | Path of landing page to redirect to |  |
| `earliestUpdatedAt` | string | No | Exclude landing page redirect rules prior to this date. Must be valid ISO-8601 string. See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |
| `latestUpdatedAt` | string | No | Exclude landing page redirect rules after this date. Must be valid ISO-8601 string. See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/redirectRules.json?maxReturn={{maxReturn}}&offset={{offset}}&redirectTolandingPageId={{redirectTolandingPageId}}&redirectToPath={{redirectToPath}}&earliestUpdatedAt={{earliestUpdatedAt}}&latestUpdatedAt={{latestUpdatedAt}}
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
