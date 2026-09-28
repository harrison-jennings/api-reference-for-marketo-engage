# Update Field Positions

**Method:** `POST`  
**Path:** `/rest/asset/v1/form/{id}/reArrange.json`  
**Tag:** Form Fields  
**Operation ID:** `updateFieldPositionsUsingPOST`  

Reorders the list of fields in a form. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `reArrangeRequest`  
**Required:** No  
**Schema:** [`ReArrangeRequest`](../models/rearrangerequest.md)

reArrangeRequest

#### Generated example

```json
{
  "positions": [
    {
      "columnNumber": 123,
      "fieldList": [
        "<circular:UpdateFieldPosition>"
      ],
      "fieldName": "Example name",
      "rowNumber": 123
    }
  ]
}
```

### Referenced models

- [`ReArrangeRequest`](../models/rearrangerequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/form/{{id}}/reArrange.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "positions": [
    {
      "columnNumber": 123,
      "fieldList": [
        "<circular:UpdateFieldPosition>"
      ],
      "fieldName": "Example name",
      "rowNumber": 123
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfIdResponse`](../models/responseofidresponse.md)

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
      "id": 123
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfIdResponse`](../models/responseofidresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
