# Delete Field from Fieldset

**Method:** `POST`  
**Path:** `/rest/asset/v1/form/{id}/fieldSet/{fieldSetId}/field/{fieldId}/delete.json`  
**Tag:** Form Fields  
**Operation ID:** `deleteFormFieldFromFieldSetUsingPOST`  

Removes the target field from the fieldset. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |
| `fieldSetId` | string | Yes | fieldSetId |  |
| `fieldId` | string | Yes | fieldId |  |

### Example request

```http
POST {{base_url}}/rest/asset/v1/form/{{id}}/fieldSet/{{fieldSetId}}/field/{{fieldId}}/delete.json
Accept: application/json
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
