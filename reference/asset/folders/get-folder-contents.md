# Get Folder Contents

**Method:** `GET`  
**Path:** `/rest/asset/v1/folder/{id}/content.json`  
**Tag:** Folders  
**Operation ID:** `getFolderContentUsingGET`  

Returns records for the contents of a given folder. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the folder to retrieve |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `maxReturn` | integer (int32) | No | Maximum number of records to return. Max 200, default 20 |  |
| `offset` | integer (int32) | No | Integer offset for paging |  |
| `type` | string | Yes | Type of folder. 'Folder' or 'Program'. Default is 'Folder' | enum: Folder, Program |

### Example request

```http
GET {{base_url}}/rest/asset/v1/folder/{{id}}/content.json?maxReturn={{maxReturn}}&offset={{offset}}&type=Folder
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfFolderContentResponse`](../models/responseoffoldercontentresponse.md)

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
      "id": 123,
      "type": "string"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfFolderContentResponse`](../models/responseoffoldercontentresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
