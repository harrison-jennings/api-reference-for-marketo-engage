# Get Available Form Fields

**Method:** `GET`  
**Path:** `/rest/asset/v1/form/fields.json`  
**Tag:** Form Fields  
**Operation ID:** `getAllFieldsUsingGET`  

Retrieves a list of all valid fields for use in forms. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `maxReturn` | integer (int32) | No | Maximum number of fields to return. Max 200, default 20 |  |
| `offset` | integer (int32) | No | Integer offset for paging |  |

### Example request

```http
GET {{base_url}}/rest/asset/v1/form/fields.json?maxReturn={{maxReturn}}&offset={{offset}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfFieldsMetaDataResponse`](../models/responseoffieldsmetadataresponse.md)

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
      "dataType": "string",
      "defaultValue": "string",
      "description": "string",
      "fieldMaskValues": "string",
      "fieldWidth": 123,
      "id": "123",
      "initiallyChecked": true,
      "isLabelToRight": true,
      "isMultiselect": true,
      "isRequired": true,
      "isSensitive": true,
      "labelWidth": 123,
      "maxLength": 123,
      "maximumNumber": 123,
      "minimumNumber": 123,
      "picklistValues": "string",
      "placeholderText": "string",
      "validationMessage": "string",
      "visibleRows": 123
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfFieldsMetaDataResponse`](../models/responseoffieldsmetadataresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
