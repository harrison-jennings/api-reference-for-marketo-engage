# Add Custom Activities

**Method:** `POST`  
**Path:** `/rest/v1/activities/external.json`  
**Tag:** Activities  
**Operation ID:** `addCustomActivityUsingPOST`  

Allows insertion of custom activities associated to given lead records. Requires provisioning of custom activity types to utilize. Required Permissions: Read-Write Activity

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `customActivityRequest`  
**Required:** Yes  
**Schema:** [`CustomActivityRequest`](../models/customactivityrequest.md)

customActivityRequest

#### Generated example

```json
{
  "input": [
    {
      "activityDate": "string",
      "activityTypeId": 123,
      "apiName": "Example name",
      "attributes": [
        {
          "apiName": "Example name",
          "name": "Example name",
          "value": {}
        }
      ],
      "errors": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "id": 123,
      "leadId": 123,
      "marketoGUID": "123",
      "primaryAttributeValue": "string",
      "status": "created"
    }
  ]
}
```

### Referenced models

- [`CustomActivityRequest`](../models/customactivityrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/activities/external.json
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "activityDate": "string",
      "activityTypeId": 123,
      "apiName": "Example name",
      "attributes": [
        {
          "apiName": "Example name",
          "name": "Example name",
          "value": {}
        }
      ],
      "errors": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "id": 123,
      "leadId": 123,
      "marketoGUID": "123",
      "primaryAttributeValue": "string",
      "status": "created"
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfCustomActivity`](../models/responseofcustomactivity.md)

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
      "activityDate": "string",
      "activityTypeId": 123,
      "apiName": "Example name",
      "attributes": [
        {
          "apiName": "Example name",
          "name": "Example name",
          "value": {}
        }
      ],
      "errors": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "id": 123,
      "leadId": 123,
      "marketoGUID": "123",
      "primaryAttributeValue": "string",
      "status": "created"
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

- [`ResponseOfCustomActivity`](../models/responseofcustomactivity.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
