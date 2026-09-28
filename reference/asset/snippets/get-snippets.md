# Get Snippets

**Method:** `GET`  
**Path:** `/rest/asset/v1/snippets.json`  
**Tag:** Snippets  
**Operation ID:** `getSnippetUsingGET`  

Retrieves a list of accessible snippets from the target instance. Required Permissions: Read-Only Assets, Read-Write Assets.

Note: Fragments created with the new email designer may appear in this API's response, but some of the fields may be null or incomplete. For complete and reliable details of these assets, use the Fragments (New) APIs; refer to the <a href="https://developer.adobe.com/marketo-apis/api/asset#operation/filterContentUsingGET_fragment">List Fragments</a> endpoint.

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `status` | string | No | Status filter for draft or approved versions | enum: approved, draft |
| `maxReturn` | integer (int32) | No | Maximum number of records to return. Max 200, default 20 |  |
| `offset` | integer (int32) | No | Integer offset for paging |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/snippets.json?status=approved&maxReturn={{maxReturn}}&offset={{offset}}
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
