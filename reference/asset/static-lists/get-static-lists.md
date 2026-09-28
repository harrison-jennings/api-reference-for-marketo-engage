# Get Static Lists

**Method:** `GET`  
**Path:** `/rest/asset/v1/staticLists.json`  
**Tag:** Static Lists  
**Operation ID:** `getStaticListsUsingGET`  

Retrieves a list of Static List records. Required Permissions: Read-Asset or Read-Write Asset

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `folder` | string | No | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `offset` | integer (int32) | No | Integer offset for paging |  |
| `maxReturn` | integer (int32) | No | Maximum number of static lists to return. Max 200, default 20. |  |
| `earliestUpdatedAt` | string | No | Exclude static lists prior to this date. Must be valid ISO-8601 string. See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |
| `latestUpdatedAt` | string | No | Exclude static lists after this date. Must be valid ISO-8601 string. See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/staticLists.json?folder={{folder}}&offset={{offset}}&maxReturn={{maxReturn}}&earliestUpdatedAt={{earliestUpdatedAt}}&latestUpdatedAt={{latestUpdatedAt}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfStaticListResponse`](../models/responseofstaticlistresponse.md)

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
      "id": 123,
      "name": "Example name",
      "description": "string",
      "createdAt": "2026-01-15T10:30:00Z",
      "updatedAt": "2026-01-15T10:30:00Z",
      "url": "https://example.com",
      "folder": {
        "id": 123,
        "type": "Folder"
      },
      "workspace": "string",
      "computedUrl": "https://example.com"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfStaticListResponse`](../models/responseofstaticlistresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
