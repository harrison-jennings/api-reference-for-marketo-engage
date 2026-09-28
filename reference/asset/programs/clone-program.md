# Clone Program

**Method:** `POST`  
**Path:** `/rest/asset/v1/program/{id}/clone.json`  
**Tag:** Programs  
**Operation ID:** `cloneProgramUsingPOST`  

Clones the target program. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `cloneProgramRequest`  
**Required:** Yes  
**Schema:** [`CloneProgramRequest`](../models/cloneprogramrequest.md)

cloneProgramRequest

#### Generated example

```json
{
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "name": "Example name"
}
```

### Referenced models

- [`CloneProgramRequest`](../models/cloneprogramrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/program/{{id}}/clone.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "name": "Example name"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfProgramResponse`](../models/responseofprogramresponse.md)

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
      "channel": "string",
      "costs": [
        {
          "cost": 123,
          "note": "string",
          "startDate": "2026-01-15T10:30:00Z"
        }
      ],
      "createdAt": "2026-01-15T10:30:00Z",
      "description": "string",
      "endDate": "2026-01-15T10:30:00Z",
      "folder": {
        "id": 123,
        "type": "Folder"
      },
      "id": 123,
      "name": "Example name",
      "sfdcId": "123",
      "sfdcName": "Example name",
      "startDate": "2026-01-15T10:30:00Z",
      "status": "locked",
      "tags": [
        {
          "tagType": "string",
          "tagValue": "string"
        }
      ],
      "type": "default",
      "updatedAt": "2026-01-15T10:30:00Z",
      "url": "https://example.com",
      "workspace": "string"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfProgramResponse`](../models/responseofprogramresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
