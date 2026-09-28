# ResponseOfLpFormResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No |  |  |
| `requestId` | string | No |  |  |
| `result` | array of [`LpFormResponse`](./lpformresponse.md) | No |  |  |
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

## Referenced models

- [`Error`](./error.md)
- [`LpFormResponse`](./lpformresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
