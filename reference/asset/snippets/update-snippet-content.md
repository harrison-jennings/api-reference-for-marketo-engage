# Update Snippet Content

**Method:** `POST`  
**Path:** `/rest/asset/v1/snippet/{id}/content.json`  
**Tag:** Snippets  
**Operation ID:** `updateContentUsingPOST_1`  

Updates the content of the target snippet. Required Permissions: Read-Write Assets

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
| `content` | string | Yes | Content of the snippet |  |
| `type` | string | Yes | Type of snippet content | enum: DynamicContent, HTML, Text |

### Example request

```http
POST {{base_url}}/rest/asset/v1/snippet/{{id}}/content.json?content={{content}}&type=DynamicContent
Accept: application/json
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
