# Create Email

**Method:** `POST`  
**Path:** `/rest/asset/v2/email`  
**Tag:** Emails (New)  
**Operation ID:** `createContentUsingPOST_email`  

Creates a new email asset. Required Permissions: Read-Write Assets, Access Design Studio, Edit Email.

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

**Name:** `createEmailRequest`  
**Required:** Yes  
**Schema:** [`CreateEmailV2Request`](../models/createemailv2request.md)

createEmailRequest

#### Generated example

```json
{
  "name": "Example name",
  "description": "string",
  "appData": {
    "editorType": "string",
    "folderId": "123",
    "programId": "123",
    "workspaceId": "123"
  },
  "data": {
    "html": {
      "body": "string"
    },
    "text": {
      "body": "string",
      "syncFromHtml": true
    }
  },
  "headers": {
    "ccEmails": [
      "person@example.com"
    ],
    "fromEmail": "person@example.com",
    "fromName": "Example name",
    "preheader": "string",
    "replyEmail": "person@example.com",
    "subject": "string"
  },
  "editorContext": {
    "dynamicContent": {}
  },
  "settings": {
    "brandedDomain": "string",
    "dedicatedIp": "string",
    "enableUrlTracking": true,
    "isOperational": true,
    "isTextOnly": true,
    "isWebPageView": true
  },
  "templateId": "123"
}
```

### Referenced models

- [`CreateEmailV2Request`](../models/createemailv2request.md)

### Example request

```http
POST {{base_url}}/rest/asset/v2/email?access_token={{access_token}}
x-app-type: marketo
Content-Type: application/json
Accept: application/json

{
  "name": "Example name",
  "description": "string",
  "appData": {
    "editorType": "string",
    "folderId": "123",
    "programId": "123",
    "workspaceId": "123"
  },
  "data": {
    "html": {
      "body": "string"
    },
    "text": {
      "body": "string",
      "syncFromHtml": true
    }
  },
  "headers": {
    "ccEmails": [
      "person@example.com"
    ],
    "fromEmail": "person@example.com",
    "fromName": "Example name",
    "preheader": "string",
    "replyEmail": "person@example.com",
    "subject": "string"
  },
  "editorContext": {
    "dynamicContent": {}
  },
  "settings": {
    "brandedDomain": "string",
    "dedicatedIp": "string",
    "enableUrlTracking": true,
    "isOperational": true,
    "isTextOnly": true,
    "isWebPageView": true
  },
  "templateId": "123"
}
```

## Responses

### 200 — OK

**Schema:** [`EmailNewResponse`](../models/emailnewresponse.md)

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
      "headers": {
        "ccEmails": [
          "person@example.com"
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
          "contentId": "123",
          "externalId": "123",
          "state": "string"
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
      "scriptEngine": "string",
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

- [`EmailNewResponse`](../models/emailnewresponse.md)

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
