# ResponseOfEmailResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`EmailResponse`](./emailresponse.md) | No |  |  |
| `success` | boolean | No |  |  |
| `warnings` | array of string | No |  |  |

## Generated example

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

## Referenced models

- [`EmailResponse`](./emailresponse.md)
- [`Error`](./error.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
