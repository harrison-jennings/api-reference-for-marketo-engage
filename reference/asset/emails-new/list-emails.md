# List Emails

**Method:** `GET`  
**Path:** `/rest/asset/v2/email/filter`  
**Tag:** Emails (New)  
**Operation ID:** `filterContentUsingGET_email`  

Filters and lists email assets by the given criteria. Required Permissions: Read-Only Assets, Access Design Studio, Access Email.

Note: The totalItems value in the response includes A/B test variants in its count; however, the A/B test variant emails themselves are not returned in the result.

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
| `templateId` | string | No |  |  |
| `scriptEngine` | string | No |  |  |
| `isValueNonNullable` | string | No |  |  |
| `includeArchived` | boolean | No |  |  |

### Header parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `x-app-type` | string | Yes | Application type header | enum: marketo |

### Example request

```http
GET {{base_url}}/rest/asset/v2/email/filter?access_token={{access_token}}&workspaceId={{workspaceId}}&folderId={{folderId}}&folderType=Folder&status={{status}}&pageIndex={{pageIndex}}&pageSize={{pageSize}}&createdAtEnd={{createdAtEnd}}&createdAtStart={{createdAtStart}}&modifiedAtStart={{modifiedAtStart}}&modifiedAtEnd={{modifiedAtEnd}}&name={{name}}&sortKey={{sortKey}}&sortOrder=ASC&isCreatedByMe={{isCreatedByMe}}&isModifiedByMe={{isModifiedByMe}}&templateId={{templateId}}&scriptEngine={{scriptEngine}}&isValueNonNullable={{isValueNonNullable}}&includeArchived={{includeArchived}}
x-app-type: marketo
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`EmailFilterResponse`](../models/emailfilterresponse.md)

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
        "headers": {
          "ccEmails": [
            null
          ],
          "fromEmail": "person@example.com",
          "fromName": "Example name",
          "preheader": "string",
          "replyEmail": "person@example.com",
          "subject": "string"
        },
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
          "isOperational": true,
          "isWebPageView": true,
          "isTextOnly": true,
          "disableOpenTracking": true,
          "enableUrlTracking": true
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
        "appData": {
          "editorType": "string",
          "workspaceId": "123",
          "folderId": "123",
          "programId": "123",
          "programName": "Example name",
          "programType": "string"
        },
        "templateId": "123",
        "externalId": "123",
        "editorContext": {
          "dynamicContent": {}
        },
        "scriptEngine": "string"
      }
    ]
  }
}
```

### Referenced models

- [`EmailFilterResponse`](../models/emailfilterresponse.md)

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
