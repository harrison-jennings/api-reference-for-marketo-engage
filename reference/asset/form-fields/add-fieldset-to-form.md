# Add Fieldset to Form

**Method:** `POST`  
**Path:** `/rest/asset/v1/form/{id}/fieldSet.json`  
**Tag:** Form Fields  
**Operation ID:** `addFieldSetUsingPOST`  

Adds a field set to the target form. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `addFormFieldSetRequest`  
**Required:** Yes  
**Schema:** [`AddFormFieldSetRequest`](../models/addformfieldsetrequest.md)

addFormFieldSetRequest

#### Generated example

```json
{
  "label": "string"
}
```

### Referenced models

- [`AddFormFieldSetRequest`](../models/addformfieldsetrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/form/{{id}}/fieldSet.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "label": "string"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLpFormFieldResponse`](../models/responseoflpformfieldresponse.md)

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
      "blankFields": 123,
      "columnNumber": 123,
      "dataType": "string",
      "defaultValue": "string",
      "fieldMetaData": {},
      "fieldWidth": 123,
      "fields": [
        "string"
      ],
      "formPrefill": true,
      "isSensitive": true,
      "hintText": "string",
      "id": "123",
      "instructions": "string",
      "label": "string",
      "labelWidth": 123,
      "maxLength": 123,
      "required": true,
      "rowNumber": 123,
      "text": "string",
      "validationMessage": {},
      "visibilityRules": {
        "ruleType": "string",
        "rules": [
          {
            "altLabel": "string",
            "operator": "string",
            "picklistFilterValues": [
              null
            ],
            "subjectField": "string",
            "values": [
              null
            ]
          }
        ]
      }
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfLpFormFieldResponse`](../models/responseoflpformfieldresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
