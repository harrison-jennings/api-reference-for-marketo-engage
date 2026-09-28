# List Custom Objects

**Method:** `GET`  
**Path:** `/rest/v1/customobjects.json`  
**Tag:** Custom Objects  
**Operation ID:** `listCustomObjectsUsingGET`  

Returns a list of Custom Object types available in the target instance, along with id and deduplication information for each type. Required Permissions: Read-Only Custom Object, Read-Write Custom Object

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `names` | array of string | No | Comma-separated list of names to filter types on | collection format: multi |

### Example request

```http
GET {{base_url}}/rest/v1/customobjects.json?names={{names}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfObjectMetaData`](../models/responseofobjectmetadata.md)

#### Generated example

```json
{
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ],
  "moreResult": false,
  "nextPageToken": "example-token",
  "requestId": "123",
  "result": [
    {
      "createdAt": "2026-01-15T10:30:00Z",
      "dedupeFields": [
        "string"
      ],
      "description": "string",
      "displayName": "Example name",
      "pluralName": "Example name",
      "fields": [
        {
          "dataType": "string",
          "displayName": "Example name",
          "length": 123,
          "name": "Example name",
          "updateable": false,
          "crmManaged": false
        }
      ],
      "idField": "string",
      "apiName": "Example name",
      "relationships": [
        {
          "field": "string",
          "relatedTo": {
            "field": "string",
            "name": "Example name"
          },
          "type": "string"
        }
      ],
      "searchableFields": [
        [
          "string"
        ]
      ],
      "updatedAt": "2026-01-15T10:30:00Z",
      "state": "draft",
      "version": "draft"
    }
  ],
  "success": false,
  "warnings": [
    {
      "code": 123,
      "message": "string"
    }
  ]
}
```

### Referenced models

- [`ResponseOfObjectMetaData`](../models/responseofobjectmetadata.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
