# Add Form Field Visibility Rules

**Method:** `POST`  
**Path:** `/rest/asset/v1/form/{formId}/field/{fieldId}/visibility.json`  
**Tag:** Form Fields  
**Operation ID:** `addFormFieldVisibilityRuleUsingPOST`  

Adds a visibility rule to the target form field. Required Permissions: Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `formId` | integer (int32) | Yes | formId |  |
| `fieldId` | string | Yes | fieldId |  |

### Request body

**Name:** `addFormFieldVisibilityRequest`  
**Required:** Yes  
**Schema:** [`AddFormFieldVisibilityRequest`](../models/addformfieldvisibilityrequest.md)

addFormFieldVisibilityRequest

#### Generated example

```json
{
  "visibilityRule": {
    "ruleType": "show",
    "rules": [
      {
        "altLabel": "string",
        "operator": "is",
        "pickListValues": [
          {
            "isDefault": true,
            "label": "string",
            "selected": true,
            "value": "string"
          }
        ],
        "subjectField": "string",
        "values": [
          "string"
        ]
      }
    ]
  }
}
```

### Referenced models

- [`AddFormFieldVisibilityRequest`](../models/addformfieldvisibilityrequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/form/{{formId}}/field/{{fieldId}}/visibility.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "visibilityRule": {
    "ruleType": "show",
    "rules": [
      {
        "altLabel": "string",
        "operator": "is",
        "pickListValues": [
          {
            "isDefault": true,
            "label": "string",
            "selected": true,
            "value": "string"
          }
        ],
        "subjectField": "string",
        "values": [
          "string"
        ]
      }
    ]
  }
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfFormVisibilityRuleResponse`](../models/responseofformvisibilityruleresponse.md)

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
      "formFieldId": "123",
      "ruleType": "string",
      "rules": [
        {
          "altLabel": "string",
          "operator": "string",
          "picklistFilterValues": [
            {
              "isDefault": null,
              "label": null,
              "selected": null,
              "value": null
            }
          ],
          "subjectField": "string",
          "values": [
            "string"
          ]
        }
      ]
    }
  ],
  "success": true,
  "warnings": [
    "string"
  ]
}
```

### Referenced models

- [`ResponseOfFormVisibilityRuleResponse`](../models/responseofformvisibilityruleresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
