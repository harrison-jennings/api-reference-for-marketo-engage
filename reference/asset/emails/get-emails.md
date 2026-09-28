# Get Emails

**Method:** `GET`  
**Path:** `/rest/asset/v1/emails.json`  
**Tag:** Emails  
**Operation ID:** `getEmailUsingGET`  

Returns a list of emails matching the given filter parameters. Required Permissions: Read-Only Assets, Read-Write Assets.

Note: Emails created with the new email designer may appear in this API's response, but some of the fields may be null or incomplete. For complete and reliable details of these assets, use the Emails (New) APIs; refer to the <a href="https://developer.adobe.com/marketo-apis/api/asset#operation/filterContentUsingGET_email">List Emails</a> endpoint.

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `status` | string | No | Status filter for draft or approved versions | enum: approved, draft |
| `folder` | string | No | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `offset` | integer (int32) | No | Integer offset for paging |  |
| `maxReturn` | integer (int32) | No | Maximum number of emails to return. Max 200, default 20 |  |
| `earliestUpdatedAt` | string | No | Exclude emails prior to this date. Must be valid ISO-8601 string. See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |
| `latestUpdatedAt` | string | No | Exclude emails after this date. Must be valid ISO-8601 string. See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/emails.json?status=approved&folder={{folder}}&offset={{offset}}&maxReturn={{maxReturn}}&earliestUpdatedAt={{earliestUpdatedAt}}&latestUpdatedAt={{latestUpdatedAt}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfEmailResponse`](../models/responseofemailresponse.md)

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
      "createdAt": "2026-01-15T10:30:00Z",
      "description": "string",
      "folder": {
        "id": 123,
        "type": "Folder"
      },
      "fromEmail": {
        "type": "string",
        "value": "string"
      },
      "fromName": {
        "type": "string",
        "value": "string"
      },
      "id": 123,
      "name": "Example name",
      "operational": true,
      "publishToMSI": true,
      "replyEmail": {
        "type": "string",
        "value": "string"
      },
      "status": "string",
      "subject": {
        "type": "string",
        "value": "string"
      },
      "template": 123,
      "textOnly": true,
      "updatedAt": "2026-01-15T10:30:00Z",
      "url": "https://example.com",
      "version": 1,
      "webView": true,
      "workspace": "string",
      "autoCopyToText": true,
      "preHeader": "string",
      "ccFields": [
        {
          "attributeId": "123",
          "objectName": "Example name",
          "displayName": "Example name",
          "apiName": "Example name"
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

- [`ResponseOfEmailResponse`](../models/responseofemailresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
