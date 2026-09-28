# Update Thank You Page

**Method:** `POST`  
**Path:** `/rest/asset/v1/form/{id}/thankYouPage.json`  
**Tag:** Forms  
**Operation ID:** `updateThankYouPageByIdUsingPOST`  

Updates the thank you page configuration for a given form. This update is destructive and the resulting draft will not have any memory of the previous configuration. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Request body

**Name:** `thankYouPageRequest`  
**Required:** Yes  
**Schema:** [`UpdateThankYouPageRequest`](../models/updatethankyoupagerequest.md)

thankYouPageRequest

#### Generated example

```json
{
  "thankyou": [
    {
      "default": true,
      "followupType": "string",
      "followupValue": "string",
      "operator": "string",
      "subjectField": "string",
      "values": [
        "string"
      ]
    }
  ]
}
```

### Referenced models

- [`UpdateThankYouPageRequest`](../models/updatethankyoupagerequest.md)

### Example request

```http
POST {{base_url}}/rest/asset/v1/form/{{id}}/thankYouPage.json
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  "thankyou": [
    {
      "default": true,
      "followupType": "string",
      "followupValue": "string",
      "operator": "string",
      "subjectField": "string",
      "values": [
        "string"
      ]
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfThankYouPageResponse`](../models/responseofthankyoupageresponse.md)

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
      "thankYouList": [
        {
          "default": true,
          "followupType": "string",
          "followupValue": {},
          "operator": "string",
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

- [`ResponseOfThankYouPageResponse`](../models/responseofthankyoupageresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
