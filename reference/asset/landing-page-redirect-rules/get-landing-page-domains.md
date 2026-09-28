# Get Landing Page Domains

**Method:** `GET`  
**Path:** `/rest/asset/v1/landingPageDomains.json`  
**Tag:** Landing Page Redirect Rules  
**Operation ID:** `getLandingPageDomainsUsingGET`  

Retrieves a list of landing page domain and domain aliases. Required Permissions: Read Only Redirect Rules, Read Write Redirect Rules

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `maxReturn` | integer (int32) | No | Maximum number of landing page domains and domain aliases to return. Max 200, default 20 |  |
| `offset` | integer (int32) | No | Integer offset for paging |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/landingPageDomains.json?maxReturn={{maxReturn}}&offset={{offset}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLandingPageDomains`](../models/responseoflandingpagedomains.md)

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
      "hostname": "Example name",
      "type": "domain"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfLandingPageDomains`](../models/responseoflandingpagedomains.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
