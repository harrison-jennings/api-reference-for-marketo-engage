# Update Form Field

**Method:** `POST`  
**Path:** `/rest/asset/v1/form/{id}/field/{fieldId}.json`  
**Tag:** Form Fields  
**Operation ID:** `updateFormFieldUsingPOST`  

Updates the configuration for that target field. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |
| `fieldId` | string | Yes | fieldId |  |

### Request body

**Name:** `updateFormFieldRequest`  
**Required:** Yes  
**Schema:** [`UpdateFormFieldRequest`](../models/updateformfieldrequest.md)

updateFormFieldRequest

#### Generated example

```json
{
  "blankFields": 123,
  "defaultValue": "string",
  "fieldType": "string",
  "fieldWidth": 123,
  "formPrefill": true,
  "isSensitive": true,
  "hintText": "string",
  "initiallyChecked": true,
  "instructions": "string",
  "label": "string",
  "labelToRight": true,
  "labelWidth": 123,
  "maskInput": "string",
  "maxLength": 123,
  "maxValue": 123,
  "minValue": 123,
  "multiSelect": true,
  "required": true,
  "validationMessage": "string",
  "values": "string",
  "visibleLines": 123
}
```

### Referenced models

- [`UpdateFormFieldRequest`](../models/updateformfieldrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/form/{{id}}/field/{{fieldId}}.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "blankFields": 123,
  "defaultValue": "string",
  "fieldType": "string",
  "fieldWidth": 123,
  "formPrefill": true,
  "isSensitive": true,
  "hintText": "string",
  "initiallyChecked": true,
  "instructions": "string",
  "label": "string",
  "labelToRight": true,
  "labelWidth": 123,
  "maskInput": "string",
  "maxLength": 123,
  "maxValue": 123,
  "minValue": 123,
  "multiSelect": true,
  "required": true,
  "validationMessage": "string",
  "values": "string",
  "visibleLines": 123
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
