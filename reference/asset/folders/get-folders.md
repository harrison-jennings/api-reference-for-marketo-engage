# Get Folders

**Method:** `GET`  
**Path:** `/rest/asset/v1/folders.json`  
**Tag:** Folders  
**Operation ID:** `getFolderUsingGET`  

Retrieves child folders from within a given root folder. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `root` | string | No | Parent folder reference |  |
| `maxDepth` | integer (int32) | No | Maximum folder depth to traverse, Default 2 |  |
| `maxReturn` | integer (int32) | No | Maximum number of folders to return. Default 20, maximum 200 |  |
| `offset` | integer (int32) | No | Integer offset for paging. Default 0 |  |
| `workSpace` | string | No | Name of the workspace |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/folders.json?root={{root}}&maxDepth={{maxDepth}}&maxReturn={{maxReturn}}&offset={{offset}}&workSpace={{workSpace}}
Accept: application/json
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
