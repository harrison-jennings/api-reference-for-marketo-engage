# Delete Folder

**Method:** `POST`  
**Path:** `/rest/asset/v1/folder/{id}/delete.json`  
**Tag:** Folders  
**Operation ID:** `deleteFolderUsingPOST`  

Deletes the designated folder. Deletion will fail if the folder has content. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the folder to delete |  |

### Form-data parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `type` | string | Yes | type | enum: Program, Folder; default: Folder |

### Example request

```http
POST {{base_url}}/rest/asset/v1/folder/{{id}}/delete.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

type=Folder
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
