# Get Tokens by Folder Id

**Method:** `GET`  
**Path:** `/rest/asset/v1/folder/{id}/tokens.json`  
**Tag:** Tokens  
**Operation ID:** `getTokensByFolderIdUsingGET`  

Retrieves the list of available My Tokens in the target folder. Required Permissions: Read-Only Assets, Read-Write Assets

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
| `folderType` | string | No | Type of folder. 'Folder' or 'Program' | enum: Folder, Program; default: Folder |

### Example request

```http
GET {{base_url}}/rest/asset/v1/folder/{{id}}/tokens.json?folderType=Folder
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfTokenResponse`](../models/responseoftokenresponse.md)

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
      "folder": "{\"id\":1001,\"type\":\"Program\"}",
      "tokens": [
        {
          "computedUrl": "https://example.com",
          "name": "Example name",
          "type": "string",
          "value": "string"
        }
      ]
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfTokenResponse`](../models/responseoftokenresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
