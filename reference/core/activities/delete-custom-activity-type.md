# Delete Custom Activity Type

**Method:** `POST`  
**Path:** `/rest/v1/activities/external/type/{apiName}/delete.json`  
**Tag:** Activities  
**Operation ID:** `deleteCustomActivityTypeUsingPOST`  

Deletes the target custom activity type. The type must first be removed from use by any assets, such as triggers or filters. Required Permissions: Read-Write Activity Metadata

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiName` | string | Yes | API Name of the activity type |  |

### Example request

```http
POST {{base_url}}/rest/v1/activities/external/type/{{apiName}}/delete.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfCustomActivityType`](../models/responseofcustomactivitytype.md)

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
      "apiName": "Example name",
      "attributes": [
        {
          "apiName": "Example name",
          "dataType": "string",
          "description": "string",
          "isPrimary": false,
          "name": "Example name"
        }
      ],
      "createdAt": "string",
      "description": "string",
      "filterName": "Example name",
      "id": 123,
      "name": "Example name",
      "primaryAttribute": {
        "apiName": "Example name",
        "dataType": "string",
        "description": "string",
        "isPrimary": false,
        "name": "Example name"
      },
      "status": "draft",
      "triggerName": "Example name",
      "updatedAt": "string"
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

- [`ResponseOfCustomActivityType`](../models/responseofcustomactivitytype.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
