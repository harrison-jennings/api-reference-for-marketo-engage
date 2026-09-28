# Delete Token by Name

**Method:** `POST`  
**Path:** `/rest/asset/v1/folder/{id}/tokens/delete.json`  
**Tag:** Tokens  
**Operation ID:** `deleteTokenByNameUsingPOST`  

Deletes a token with the given name from the parent folder. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `deleteTokenRequest`  
**Required:** Yes  
**Schema:** [`DeleteTokenRequest`](../models/deletetokenrequest.md)

deleteTokenRequest

#### Generated example

```json
{
  "folderType": "Program",
  "name": "Example name",
  "type": "string"
}
```

### Referenced models

- [`DeleteTokenRequest`](../models/deletetokenrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/folder/{{id}}/tokens/delete.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "folderType": "Program",
  "name": "Example name",
  "type": "string"
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
