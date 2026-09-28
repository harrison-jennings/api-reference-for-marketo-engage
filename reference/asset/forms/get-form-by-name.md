# Get Form by Name

**Method:** `GET`  
**Path:** `/rest/asset/v1/form/byName.json`  
**Tag:** Forms  
**Operation ID:** `getLpFormByNameUsingGET`  

Retrieves a form record by its name. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of the form |  |
| `status` | string | No | Status filter for draft or approved versions | enum: approved, draft |
| `folder` | string | No | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/form/byName.json?name={{name}}&status=approved&folder={{folder}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLpFormResponse`](../models/responseoflpformresponse.md)

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
      "buttonLabel": "string",
      "buttonLocation": 123,
      "createdAt": "2026-01-15T10:30:00Z",
      "description": "string",
      "folder": {
        "id": 123,
        "type": "Folder"
      },
      "fontFamily": "string",
      "fontSize": "string",
      "id": 123,
      "knownVisitor": {
        "template": "string",
        "type": "string"
      },
      "labelPosition": "string",
      "language": "string",
      "locale": "string",
      "name": "Example name",
      "progressiveProfiling": true,
      "status": "approved",
      "thankYouList": [
        {
          "default": true,
          "followupType": "string",
          "followupValue": {},
          "operator": "string",
          "subjectField": "string",
          "values": [
            "string"
          ]
        }
      ],
      "theme": "string",
      "updatedAt": "2026-01-15T10:30:00Z",
      "url": "https://example.com",
      "waitingLabel": "string"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfLpFormResponse`](../models/responseoflpformresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
