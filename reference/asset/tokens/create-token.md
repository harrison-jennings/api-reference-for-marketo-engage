# Create Token

**Method:** `POST`  
**Path:** `/rest/asset/v1/folder/{id}/tokens.json`  
**Tag:** Tokens  
**Operation ID:** `addTokenTOFolderUsingPOST`  

Create or update a token in the parent folder. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | Id of the folder to which the token will be associated with |  |

### Request body

**Name:** `createTokenRequest`  
**Required:** Yes  
**Schema:** [`CreateTokenRequest`](../models/createtokenrequest.md)

createTokenRequest

#### Generated example

```json
{
  "folderType": "Program",
  "name": "Example name",
  "type": "date",
  "value": "string"
}
```

### Referenced models

- [`CreateTokenRequest`](../models/createtokenrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/folder/{{id}}/tokens.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "folderType": "Program",
  "name": "Example name",
  "type": "date",
  "value": "string"
}
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
