# Update Form Metadata

**Method:** `POST`  
**Path:** `/rest/asset/v1/form/{id}.json`  
**Tag:** Forms  
**Operation ID:** `updateFormsUsingPOST`  

Updates the metadata of the target form. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `updateFormMetaDataRequest`  
**Required:** Yes  
**Schema:** [`UpdateFormMetaDataRequest`](../models/updateformmetadatarequest.md)

updateFormMetaDataRequest

#### Generated example

```json
{
  "customCss": "string",
  "description": "string",
  "fontFamily": "string",
  "fontSize": "string",
  "knownVisitor": {
    "template": "string",
    "type": "string"
  },
  "labelPosition": "string",
  "language": "string",
  "locale": "string",
  "name": "Example name",
  "progressiveProfiling": true,
  "theme": "string"
}
```

### Referenced models

- [`UpdateFormMetaDataRequest`](../models/updateformmetadatarequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/form/{{id}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "customCss": "string",
  "description": "string",
  "fontFamily": "string",
  "fontSize": "string",
  "knownVisitor": {
    "template": "string",
    "type": "string"
  },
  "labelPosition": "string",
  "language": "string",
  "locale": "string",
  "name": "Example name",
  "progressiveProfiling": true,
  "theme": "string"
}
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
