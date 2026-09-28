# Get Programs

**Method:** `GET`  
**Path:** `/rest/asset/v1/programs.json`  
**Tag:** Programs  
**Operation ID:** `browseProgramsUsingGET`  

Retrieves the list of accessible programs from the target instance. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `maxReturn` | integer (int32) | No | Maximum number of records to return. Max 200, default 20 |  |
| `offset` | integer (int32) | No | Integer offset for paging |  |
| `filterType` | string | No | Optional filter. Requires filterValues | enum: id, programId, folderId, workspace |
| `earliestUpdatedAt` | string | No | Exclude programs prior to this date. Must be valid ISO-8601 string. See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |
| `latestUpdatedAt` | string | No | Exclude programs after this date. Must be valid ISO-8601 string. See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/programs.json?maxReturn={{maxReturn}}&offset={{offset}}&filterType=id&earliestUpdatedAt={{earliestUpdatedAt}}&latestUpdatedAt={{latestUpdatedAt}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfBrowseAllPrograms`](../models/responseofbrowseallprograms.md)

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
      "createdAt": "2026-01-15T10:30:00Z",
      "description": "string",
      "folder": {
        "id": 123,
        "type": "Folder"
      },
      "id": 123,
      "name": "Example name",
      "sfdcId": "123",
      "sfdcName": "Example name",
      "status": "locked",
      "type": "program",
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

- [`ResponseOfBrowseAllPrograms`](../models/responseofbrowseallprograms.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
