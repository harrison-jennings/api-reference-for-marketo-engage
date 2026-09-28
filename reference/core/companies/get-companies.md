# Get Companies

**Method:** `GET`  
**Path:** `/rest/v1/companies.json`  
**Tag:** Companies  
**Operation ID:** `getCompaniesUsingGET`  

Retrieves company records from the destination instance based on the submitted filter. Required Permissions: Read-Only Company, Read-Write Company

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `filterType` | string | Yes | The company field to filter on. Searchable fields can be retrieved with the Describe Company call. |  |
| `filterValues` | array of string | Yes | Comma-separated list of values to match against | collection format: multi |
| `fields` | array of string | No | Comma-separated list of fields to include in the response | collection format: multi |
| `batchSize` | integer (int32) | No | The batch size to return. The max and default value is 300. |  |
| `nextPageToken` | string | No | A token will be returned by this endpoint if the result set is greater than the batch size and can be passed in a subsequent call through this parameter. See Paging Tokens for more info. |  |

### Example request

```http
GET {{base_url}}/rest/v1/companies.json?filterType={{filterType}}&filterValues={{filterValues}}&fields={{fields}}&batchSize={{batchSize}}&nextPageToken={{nextPageToken}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfCompany`](../models/responseofcompany.md)

#### Generated example

```json
{
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ],
  "nextPageToken": "example-token",
  "requestId": "123",
  "result": [
    {
      "id": 123,
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123,
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

- [`ResponseOfCompany`](../models/responseofcompany.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
