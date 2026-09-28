# Update Snippet Dynamic Content

**Method:** `POST`  
**Path:** `/rest/asset/v1/snippet/{id}/dynamicContent/{segmentId}.json`  
**Tag:** Snippets  
**Operation ID:** `updateDynamicContentUsingPOST`  

Updates the target dynamic content section. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |
| `segmentId` | integer (int32) | Yes | segmentId |  |

### Request body

**Name:** `request`  
**Required:** Yes  
**Schema:** [`UpdateSnippetDynamicContentRequest`](../models/updatesnippetdynamiccontentrequest.md)

request

#### Generated example

```json
{
  "type": "Typeofcontent.Either'HTML'or'Text'",
  "value": "string"
}
```

### Referenced models

- [`UpdateSnippetDynamicContentRequest`](../models/updatesnippetdynamiccontentrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/snippet/{{id}}/dynamicContent/{{segmentId}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "type": "Typeofcontent.Either'HTML'or'Text'",
  "value": "string"
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
