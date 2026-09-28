# Create Landing Page

**Method:** `POST`  
**Path:** `/rest/asset/v1/landingPages.json`  
**Tag:** Landing Pages  
**Operation ID:** `createLandingPageUsingPOST`  

Creates a new landing page. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Request body

**Name:** `createLandingPageRequest`  
**Required:** Yes  
**Schema:** [`CreateLandingPageRequest`](../models/createlandingpagerequest.md)

createLandingPageRequest

#### Generated example

```json
{
  "customHeadHTML": "string",
  "description": "string",
  "facebookOgTags": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "keywords": "string",
  "mobileEnabled": true,
  "name": "Example name",
  "prefillForm": true,
  "robots": "string",
  "template": 123,
  "title": "string",
  "urlPageName": "https://example.com",
  "workspace": "string"
}
```

### Referenced models

- [`CreateLandingPageRequest`](../models/createlandingpagerequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/landingPages.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "customHeadHTML": "string",
  "description": "string",
  "facebookOgTags": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "keywords": "string",
  "mobileEnabled": true,
  "name": "Example name",
  "prefillForm": true,
  "robots": "string",
  "template": 123,
  "title": "string",
  "urlPageName": "https://example.com",
  "workspace": "string"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLandingPageResponse`](../models/responseoflandingpageresponse.md)

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
      "URL": "https://example.com",
      "computedUrl": "https://example.com",
      "destinationUrl": "https://example.com",
      "createdAt": "2026-01-15T10:30:00Z",
      "customHeadHTML": "string",
      "description": "string",
      "facebookOgTags": "string",
      "folder": {
        "id": 123,
        "type": "Folder"
      },
      "formPrefill": true,
      "id": 123,
      "keywords": "string",
      "mobileEnabled": true,
      "name": "Example name",
      "robots": "string",
      "status": "string",
      "template": 123,
      "title": "string",
      "updatedAt": "2026-01-15T10:30:00Z",
      "workspace": "string"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfLandingPageResponse`](../models/responseoflandingpageresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
