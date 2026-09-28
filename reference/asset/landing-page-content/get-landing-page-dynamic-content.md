# Get Landing Page Dynamic Content

**Method:** `GET`  
**Path:** `/rest/asset/v1/landingPage/{id}/dynamicContent/{contentId}.json`  
**Tag:** Landing Page Content  
**Operation ID:** `getLandingPageDynamicContentsUsingGET`  

Retrieves the dynamic content from the target section. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of landing page |  |
| `contentId` | string | Yes | Id of landing page dynamic content section |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/landingPage/{{id}}/dynamicContent/{{contentId}}.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLandingPageDynamicContentResponse`](../models/responseoflandingpagedynamiccontentresponse.md)

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
      "content": [
        {
          "content": {},
          "followupType": "string",
          "followupValue": "string",
          "segmentId": 123,
          "segmentName": "Example name",
          "type": "string"
        }
      ],
      "createdAt": "2026-01-15T10:30:00Z",
      "id": 123,
      "segmentation": 123,
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

- [`ResponseOfLandingPageDynamicContentResponse`](../models/responseoflandingpagedynamiccontentresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
