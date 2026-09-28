# Get Tag By Name

**Method:** `GET`  
**Path:** `/rest/asset/v1/tagType/byName.json`  
**Tag:** Tags  
**Operation ID:** `getTagByNameUsingGET`  

Retrieves a tag by its name. This will also return the set of valid values for the tag. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `name` | string | Yes | Name of the tag |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/tagType/byName.json?name={{name}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfTagResponse`](../models/responseoftagresponse.md)

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
      "allowableValues": "string",
      "applicableProgramTypes": "string",
      "required": true,
      "tagType": "string"
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfTagResponse`](../models/responseoftagresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
