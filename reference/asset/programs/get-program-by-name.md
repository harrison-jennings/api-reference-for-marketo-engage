# Get Program by Name

**Method:** `GET`  
**Path:** `/rest/asset/v1/program/byName.json`  
**Tag:** Programs  
**Operation ID:** `getProgramByNameUsingGET`  

Retrieves the program record for the given name. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of the program |  |
| `includeTags` | boolean | No | Set true to populate program tags |  |
| `includeCosts` | boolean | No | Set true to populate program costs |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/program/byName.json?name={{name}}&includeTags={{includeTags}}&includeCosts={{includeCosts}}
Accept: application/json
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
