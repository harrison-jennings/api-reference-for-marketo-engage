# Update Landing Page Metadata

**Method:** `POST`  
**Path:** `/rest/asset/v1/landingPage/{id}.json`  
**Tag:** Landing Pages  
**Operation ID:** `updateLandingPageUsingPOST`  

Updates the metadata for the targe landing page. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `updateLandingPageRequest`  
**Required:** Yes  
**Schema:** [`UpdateLandingPageRequest`](../models/updatelandingpagerequest.md)

updateLandingPageRequest

#### Generated example

```json
{
  "customHeadHTML": "string",
  "description": "string",
  "facebookOgTags": "string",
  "keywords": "string",
  "metaTagsDescription": "string",
  "mobileEnabled": true,
  "name": "Example name",
  "robots": "string",
  "styleOverRide": "string",
  "title": "string",
  "urlPageName": "https://example.com"
}
```

### Referenced models

- [`UpdateLandingPageRequest`](../models/updatelandingpagerequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/landingPage/{{id}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "customHeadHTML": "string",
  "description": "string",
  "facebookOgTags": "string",
  "keywords": "string",
  "metaTagsDescription": "string",
  "mobileEnabled": true,
  "name": "Example name",
  "robots": "string",
  "styleOverRide": "string",
  "title": "string",
  "urlPageName": "https://example.com"
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
