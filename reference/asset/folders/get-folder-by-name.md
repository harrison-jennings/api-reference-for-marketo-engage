# Get Folder by Name

**Method:** `GET`  
**Path:** `/rest/asset/v1/folder/byName.json`  
**Tag:** Folders  
**Operation ID:** `getFolderByNameUsingGET`  

Returns a folder record for the given name. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of the folder. Not applicable for Programs |  |
| `type` | string | No | Type of folder. 'Folder' or 'Program' |  |
| `root` | string | No | Parent folder reference |  |
| `workSpace` | string | No | Name of the workspace |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/folder/byName.json?name={{name}}&type={{type}}&root={{root}}&workSpace={{workSpace}}
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
