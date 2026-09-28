# Update Landing Page Dynamic Content Section

**Method:** `POST`  
**Path:** `/rest/asset/v1/landingPage/{id}/dynamicContent/{contentId}.json`  
**Tag:** Landing Page Content  
**Operation ID:** `updateLandingPageDynamicContentUsingPOST`  

Updates the content of the target dynamic content section. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the landing page |  |
| `contentId` | string | Yes | Id of the landing page dynamic content |  |

### Request body

**Name:** `request`  
**Required:** No  
**Schema:** [`UpdateLandingPageDynamicContentRequest`](../models/updatelandingpagedynamiccontentrequest.md)

Dynamic content properties

#### Generated example

```json
{
  "backgroundColor": "string",
  "borderColor": "string",
  "borderStyle": "string",
  "borderWidth": "string",
  "height": "string",
  "hideDesktop": true,
  "hideMobile": true,
  "imageOpenNewWindow": "string",
  "left": "string",
  "linkUrl": "https://example.com",
  "opacity": "string",
  "segment": "string",
  "top": "string",
  "type": "string",
  "value": "string",
  "width": "string",
  "zIndex": "string"
}
```

### Referenced models

- [`UpdateLandingPageDynamicContentRequest`](../models/updatelandingpagedynamiccontentrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/landingPage/{{id}}/dynamicContent/{{contentId}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "backgroundColor": "string",
  "borderColor": "string",
  "borderStyle": "string",
  "borderWidth": "string",
  "height": "string",
  "hideDesktop": true,
  "hideMobile": true,
  "imageOpenNewWindow": "string",
  "left": "string",
  "linkUrl": "https://example.com",
  "opacity": "string",
  "segment": "string",
  "top": "string",
  "type": "string",
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
