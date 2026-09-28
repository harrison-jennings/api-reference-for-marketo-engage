# Get Landing Pages

**Method:** `GET`  
**Path:** `/rest/asset/v1/landingPages.json`  
**Tag:** Landing Pages  
**Operation ID:** `browseLandingPagesUsingGET`  

Retrieves a list of accessible landing pages from the target instance. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `status` | string | No | Status filter for draft or approved versions | enum: approved, draft |
| `maxReturn` | integer (int32) | No | Maximum number of landing pages to return. Max 200, default 20 |  |
| `offset` | integer (int32) | No | Integer offset for paging |  |
| `folder` | string | No | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/landingPages.json?status=approved&maxReturn={{maxReturn}}&offset={{offset}}&folder={{folder}}
Accept: application/json
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
