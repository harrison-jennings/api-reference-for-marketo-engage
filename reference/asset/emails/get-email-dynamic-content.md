# Get Email Dynamic Content

**Method:** `GET`  
**Path:** `/rest/asset/v1/email/{id}/dynamicContent/{contentId}.json`  
**Tag:** Emails  
**Operation ID:** `getEmailDynamicContentUsingGET`  

Retrieves the dynamic content record for the given section. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of email |  |
| `contentId` | string | Yes | Id of email dynamic content section |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `status` | string | No | Status filter for draft or approved versions | enum: approved, draft |

### Example request

```http
GET {{base_url}}/rest/asset/v1/email/{{id}}/dynamicContent/{{contentId}}.json?status=approved
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfEmailDynamicContentResponse`](../models/responseofemaildynamiccontentresponse.md)

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
          "content": "string",
          "id": "123",
          "segmentId": "123",
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

- [`ResponseOfEmailDynamicContentResponse`](../models/responseofemaildynamiccontentresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
