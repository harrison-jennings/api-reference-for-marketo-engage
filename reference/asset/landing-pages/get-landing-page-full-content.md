# Get Landing Page Full Content

**Method:** `GET`  
**Path:** `/rest/asset/v1/landingPage/{id}/fullContent.json`  
**Tag:** Landing Pages  
**Operation ID:** `getLandingPageFullContentUsingGET`  

Returns the serialized HTML version of the landing page. Required Permissions: Read-Only Assets, Read-Write Assets. If leadId is passed in the request: Read-Only Lead, Read-Write Lead.

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the landing page. |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `leadId` | integer (int32) | No | The lead id to impersonate. Landing page is rendered as though it was viewed by this lead. |  |
| `segmentation` | string | No | JSON array of of segmentations. Each segmentation must be a JSON object with members 'segmentationId', and 'segmentId'.<br>Example: [{"segmentationId":1030,"segmentId":1103}] |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/landingPage/{{id}}/fullContent.json?leadId={{leadId}}&segmentation={{segmentation}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfGetLandingPageFullContentResponse`](../models/responseofgetlandingpagefullcontentresponse.md)

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
      "content": "string",
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

- [`ResponseOfGetLandingPageFullContentResponse`](../models/responseofgetlandingpagefullcontentresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
