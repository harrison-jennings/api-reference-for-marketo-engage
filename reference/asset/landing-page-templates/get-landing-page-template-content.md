# Get Landing Page Template Content

**Method:** `GET`  
**Path:** `/rest/asset/v1/landingPageTemplate/{id}/content.json`  
**Tag:** Landing Page Templates  
**Operation ID:** `getLandingPageTemplateContentUsingGET`  

Retrieves the content of the target landing page. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `status` | string | No | Status filter for draft or approved versions | enum: approved, draft |

### Example request

```http
GET {{base_url}}/rest/asset/v1/landingPageTemplate/{{id}}/content.json?status=approved
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLpTemplateGetContentResponse`](../models/responseoflptemplategetcontentresponse.md)

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
      "enableMunchkin": true,
      "id": 123,
      "status": "approved",
      "templateType": "guided"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfLpTemplateGetContentResponse`](../models/responseoflptemplategetcontentresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
