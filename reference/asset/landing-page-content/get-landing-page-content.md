# Get Landing Page Content

**Method:** `GET`  
**Path:** `/rest/asset/v1/landingPage/{id}/content.json`  
**Tag:** Landing Page Content  
**Operation ID:** `getLandingPageContentUsingGET`  

Retrieves the list of content sections in the target landing page. Required Permissions: Read-Only Assets, Read-Write Assets

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
GET {{base_url}}/rest/asset/v1/landingPage/{{id}}/content.json?status=approved
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLandingPageContentResponse`](../models/responseoflandingpagecontentresponse.md)

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
      "content": {},
      "followupType": "url",
      "followupValue": "string",
      "formattingOptions": {
        "array": true,
        "bigDecimal": true,
        "bigInteger": true,
        "binary": true,
        "boolean": true,
        "containerNode": true,
        "double": true,
        "float": true,
        "floatingPointNumber": true,
        "int": true,
        "integralNumber": true,
        "long": true,
        "missingNode": true,
        "nodeType": "ARRAY",
        "null": true,
        "number": true,
        "object": true,
        "pojo": true,
        "short": true,
        "textual": true,
        "valueNode": true
      },
      "id": {},
      "index": 123,
      "type": "Image"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfLandingPageContentResponse`](../models/responseoflandingpagecontentresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
