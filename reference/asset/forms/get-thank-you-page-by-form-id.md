# Get Thank You Page by Form Id

**Method:** `GET`  
**Path:** `/rest/asset/v1/form/{id}/thankYouPage.json`  
**Tag:** Forms  
**Operation ID:** `getThankYouPageByIdUsingGET`  

Returns the thank you page configuration for a given form. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
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

### Example request

```http
GET {{base_url}}/rest/asset/v1/form/{{id}}/thankYouPage.json?status=approved
Accept: application/json
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
