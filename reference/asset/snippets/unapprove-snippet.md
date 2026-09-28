# Unapprove Snippet

**Method:** `POST`  
**Path:** `/rest/asset/v1/snippet/{id}/unapprove.json`  
**Tag:** Snippets  
**Operation ID:** `unapproveSnippetUsingPOST`  

Unapproves the current version of the snippet. The snippet may not be in use. The snippet will be reverted to a draft-only state. Required Permissions: Approve Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Example request

```http
POST {{base_url}}/rest/asset/v1/snippet/{{id}}/unapprove.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSnippetResponse`](../models/responseofsnippetresponse.md)

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
      "createdAt": "2026-01-15T10:30:00Z",
      "description": "string",
      "folder": {
        "value": 123,
        "type": "Folder",
        "folderName": "Example name"
      },
      "id": 123,
      "name": "Example name",
      "status": "string",
      "updatedAt": "2026-01-15T10:30:00Z",
      "url": "https://example.com",
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

- [`ResponseOfSnippetResponse`](../models/responseofsnippetresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
