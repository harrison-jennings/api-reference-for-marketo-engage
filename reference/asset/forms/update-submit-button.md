# Update Submit Button

**Method:** `POST`  
**Path:** `/rest/asset/v1/form/{id}/submitButton.json`  
**Tag:** Forms  
**Operation ID:** `updateFormSubmitButtonUsingPOST`  

Updates the submit button configuration for the target form. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `submitButtonRequest`  
**Required:** Yes  
**Schema:** [`SubmitButtonRequest`](../models/submitbuttonrequest.md)

submitButtonRequest

#### Generated example

```json
{
  "buttonPosition": 123,
  "buttonStyle": "string",
  "label": "string",
  "waitingLabel": "string"
}
```

### Referenced models

- [`SubmitButtonRequest`](../models/submitbuttonrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/form/{{id}}/submitButton.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "buttonPosition": 123,
  "buttonStyle": "string",
  "label": "string",
  "waitingLabel": "string"
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
