# Update Folder Metadata

**Method:** `POST`  
**Path:** `/rest/asset/v1/folder/{id}.json`  
**Tag:** Folders  
**Operation ID:** `updateFolderUsingPOST`  

Updates the metadata for a given folder. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the folder to update |  |

### Request body

**Name:** `updateFolderRequest`  
**Required:** Yes  
**Schema:** [`UpdateFolderRequest`](../models/updatefolderrequest.md)

updateFolderRequest

#### Generated example

```json
{
  "description": "string",
  "isArchive": true,
  "name": "Example name",
  "type": "Folder"
}
```

### Referenced models

- [`UpdateFolderRequest`](../models/updatefolderrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/folder/{{id}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "description": "string",
  "isArchive": true,
  "name": "Example name",
  "type": "Folder"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfFolderResponse`](../models/responseoffolderresponse.md)

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
      "accessZoneId": 123,
      "createdAt": "2026-01-15T10:30:00Z",
      "description": "string",
      "folderId": {
        "id": 123,
        "type": "Folder"
      },
      "folderType": "Email",
      "id": 123,
      "isArchive": true,
      "isSystem": true,
      "name": "Example name",
      "parent": {
        "id": 123,
        "type": "Folder"
      },
      "path": "string",
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

- [`ResponseOfFolderResponse`](../models/responseoffolderresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
