# Clone Fragment

**Method:** `POST`  
**Path:** `/rest/asset/v2/fragment/clone`  
**Tag:** Fragments (New)  
**Operation ID:** `cloneContentUsingPOST_fragment`  

Clones an existing fragment. Required Permissions: Read-Write Assets, Access Design Studio, Edit Snippet.

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `access_token` | string | Yes | Token for Authorization |  |

### Header parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `x-app-type` | string | Yes | Application type header | enum: marketo |

### Request body

**Name:** `cloneAssetRequest`  
**Required:** Yes  
**Schema:** [`CloneAssetRequest`](../models/cloneassetrequest.md)

cloneAssetRequest

#### Generated example

```json
{
  "assetId": "123",
  "newAsset": {
    "name": "Example name",
    "description": "string"
  }
}
```

### Referenced models

- [`CloneAssetRequest`](../models/cloneassetrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v2/fragment/clone?access_token={{access_token}}
x-app-type: marketo
Content-Type: application/json
Accept: application/json

{
  "assetId": "123",
  "newAsset": {
    "name": "Example name",
    "description": "string"
  }
}
```

## Responses

### 200 — OK

**Schema:** [`FragmentNewResponse`](../models/fragmentnewresponse.md)

#### Generated example

```json
{
  "success": true,
  "requestId": "123",
  "result": [
    {
      "id": "123",
      "name": "Example name",
      "description": "string",
      "appType": "string",
      "metadata": {
        "createdBy": "string",
        "createdAt": "string",
        "createdById": "123",
        "createdByAepId": "123",
        "modifiedBy": "string",
        "modifiedAt": "string",
        "modifiedById": "123",
        "modifiedByAepId": "123"
      },
      "settings": {
        "fragmentType": "string",
        "fragmentSubType": "string",
        "supportedChannels": [
          "string"
        ]
      },
      "thumbnail": {
        "url": "https://example.com"
      },
      "status": "string",
      "state": "string",
      "virtualId": "123",
      "associatedStates": [
        {
          "contentId": "123",
          "externalId": "123",
          "state": "string"
        }
      ],
      "appData": {
        "editorType": "string",
        "folderId": "123",
        "workspaceId": "123"
      },
      "externalId": "123",
      "editorContext": {
        "dynamicContent": {}
      },
      "scriptEngine": "string",
      "themeId": "123",
      "data": {
        "html": {
          "body": "string"
        },
        "text": {
          "body": "string",
          "syncFromHtml": true
        }
      }
    }
  ]
}
```

### Referenced models

- [`FragmentNewResponse`](../models/fragmentnewresponse.md)

### default — Error

**Schema:** [`ErrorResponse`](../models/errorresponse.md)

#### Generated example

```json
{
  "success": true,
  "requestId": "123",
  "errors": [
    {
      "key": "string",
      "message": "string",
      "code": "string",
      "dynamicMessage": "string",
      "type": "string",
      "source": "string",
      "errorMessage": "string",
      "errorPosition": {
        "line": 123,
        "column": 123
      }
    }
  ]
}
```

### Referenced models

- [`ErrorResponse`](../models/errorresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
