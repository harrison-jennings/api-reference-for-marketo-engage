# Get Company Fields

**Method:** `GET`  
**Path:** `/rest/v1/companies/schema/fields.json`  
**Tag:** Companies  
**Operation ID:** `getCompanyFieldsUsingGET`  

Retrieves metadata for all company fields in the target instance. Required Permissions: Read-Write Schema Standard Field, Read-Write Schema Custom Field

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `batchSize` | integer (int32) | No | The batch size to return. The max and default value is 300. |  |
| `nextPageToken` | string | No | A token will be returned by this endpoint if the result set is greater than the batch size and can be passed in a subsequent call through this parameter. See Paging Tokens for more info. |  |

### Example request

```http
GET {{base_url}}/rest/v1/companies/schema/fields.json?batchSize={{batchSize}}&nextPageToken={{nextPageToken}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfLeadField`](../models/responseofleadfield.md)

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
      "displayName": "Example name",
      "name": "Example name",
      "description": "string",
      "dataType": "string",
      "length": 123,
      "isHidden": false,
      "isHtmlEncodingInEmail": false,
      "isSensitive": false,
      "isCustom": false,
      "isApiCreated": false
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

- [`ResponseOfLeadField`](../models/responseofleadfield.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
