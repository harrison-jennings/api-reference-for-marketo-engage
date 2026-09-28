# List Email Templates

**Method:** `GET`  
**Path:** `/rest/asset/v2/emailtemplate/filter`  
**Tag:** Email Templates (New)  
**Operation ID:** `filterContentUsingGET_emailtemplate`  

Filters and lists email templates by the given criteria. Required Permissions: Read-Only Assets, Access Design Studio, Access Email Template.

## Formats

- **Request:** Not specified
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `access_token` | string | Yes | Token for Authorization |  |
| `workspaceId` | string | Yes |  |  |
| `folderId` | string | No |  |  |
| `folderType` | string | No |  | enum: Folder, Program |
| `status` | array of string | No |  | collection format: multi |
| `pageIndex` | integer (int32) | No |  |  |
| `pageSize` | integer (int32) | No | Maximum value is 50. |  |
| `createdAtEnd` | string | No |  |  |
| `createdAtStart` | string | No |  |  |
| `modifiedAtStart` | string | No |  |  |
| `modifiedAtEnd` | string | No |  |  |
| `name` | string | No |  |  |
| `sortKey` | string | No |  |  |
| `sortOrder` | string | No |  | enum: ASC, DESC |
| `isCreatedByMe` | boolean | No |  |  |
| `isModifiedByMe` | boolean | No |  |  |
| `scriptEngine` | string | No |  |  |
| `isValueNonNullable` | string | No |  |  |
| `includeArchived` | boolean | No |  |  |

### Header parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `x-app-type` | string | Yes | Application type header | enum: marketo |

### Example request

```http
GET {{base_url}}/rest/asset/v2/emailtemplate/filter?access_token={{access_token}}&workspaceId={{workspaceId}}&folderId={{folderId}}&folderType=Folder&status={{status}}&pageIndex={{pageIndex}}&pageSize={{pageSize}}&createdAtEnd={{createdAtEnd}}&createdAtStart={{createdAtStart}}&modifiedAtStart={{modifiedAtStart}}&modifiedAtEnd={{modifiedAtEnd}}&name={{name}}&sortKey={{sortKey}}&sortOrder=ASC&isCreatedByMe={{isCreatedByMe}}&isModifiedByMe={{isModifiedByMe}}&scriptEngine={{scriptEngine}}&isValueNonNullable={{isValueNonNullable}}&includeArchived={{includeArchived}}
x-app-type: marketo
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`EmailTemplateFilterResponse`](../models/emailtemplatefilterresponse.md)

#### Generated example

```json
{
  "success": true,
  "requestId": "123",
  "result": {
    "totalItems": 123,
    "pageSize": 123,
    "currentPage": 123,
    "items": [
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
        "status": "string",
        "state": "string",
        "virtualId": "123",
        "associatedStates": [
          {
            "contentId": null,
            "externalId": null,
            "state": null
          }
        ],
        "version": 123,
        "appData": {
          "editorType": "string",
          "folderId": "123",
          "workspaceId": "123"
        },
        "externalId": "123",
        "scriptEngine": "string"
      }
    ]
  }
}
```

### Referenced models

- [`EmailTemplateFilterResponse`](../models/emailtemplatefilterresponse.md)

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
