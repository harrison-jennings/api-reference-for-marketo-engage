# Add Landing Page Content Section

**Method:** `POST`  
**Path:** `/rest/asset/v1/landingPage/{id}/content.json`  
**Tag:** Landing Page Content  
**Operation ID:** `addLandingPageContentUsingPOST`  

Adds a content section to the target landing page. Parameters must be sent as application/x-www-form-urlencoded (not JSON). Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `request`  
**Required:** Yes  
**Schema:** [`CreateLandingPageContentRequest`](../models/createlandingpagecontentrequest.md)

request

#### Generated example

```json
{
  "backgroundColor": "string",
  "borderColor": "string",
  "borderStyle": "string",
  "borderWidth": "string",
  "contentId": "123",
  "height": "string",
  "hideDesktop": true,
  "hideMobile": true,
  "imageOpenNewWindow": "string",
  "left": "string",
  "linkUrl": "https://example.com",
  "opacity": "string",
  "top": "string",
  "type": "Image",
  "value": "string",
  "width": "string",
  "zIndex": "string"
}
```

### Referenced models

- [`CreateLandingPageContentRequest`](../models/createlandingpagecontentrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/landingPage/{{id}}/content.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "backgroundColor": "string",
  "borderColor": "string",
  "borderStyle": "string",
  "borderWidth": "string",
  "contentId": "123",
  "height": "string",
  "hideDesktop": true,
  "hideMobile": true,
  "imageOpenNewWindow": "string",
  "left": "string",
  "linkUrl": "https://example.com",
  "opacity": "string",
  "top": "string",
  "type": "Image",
  "value": "string",
  "width": "string",
  "zIndex": "string"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfIdResponse`](../models/responseofidresponse.md)

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
      "id": 123
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfIdResponse`](../models/responseofidresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
