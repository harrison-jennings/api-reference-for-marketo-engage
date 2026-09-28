# Get Segments For Segmentation

**Method:** `GET`  
**Path:** `/rest/asset/v1/segmentation/{id}/segments.json`  
**Tag:** Segments  
**Operation ID:** `getSegmentsForSegmentationUsingGET`  

Retrieves a list of segments inside the target segmentation. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `status` | string | No | Status filter for draft or approved versions | enum: approved, draft |
| `offset` | integer (int32) | No | Integer offset for paging |  |
| `maxReturn` | integer (int32) | No | Maximum number of records to return. Max 200, default 20 |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/segmentation/{{id}}/segments.json?status=approved&offset={{offset}}&maxReturn={{maxReturn}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfSegmentsResponse`](../models/responseofsegmentsresponse.md)

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
      "id": 123,
      "name": "Example name",
      "segmentationId": 123,
      "updatedAt": "2026-01-15T10:30:00Z",
      "url": "https://example.com"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfSegmentsResponse`](../models/responseofsegmentsresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
