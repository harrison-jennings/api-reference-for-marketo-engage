# Get Named Account Lists

**Method:** `GET`  
**Path:** `/rest/v1/namedAccountLists.json`  
**Tag:** Named Account Lists  
**Operation ID:** `getNamedAccountListsUsingGET`  

Retrieves a list of named account list records based on the filter type and values given. Required Permissions: Read-Only Named Account List, Read-Write Named Account List

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `filterType` | string | Yes | The named account list field to filter on ("dedupeFields" or "idFields"). |  |
| `filterValues` | array of string | Yes | Comma-separated list of values to match against | collection format: multi |
| `batchSize` | integer (int32) | No | The batch size to return. The max and default value is 300. |  |
| `nextPageToken` | string | No | A token will be returned by this endpoint if the result set is greater than the batch size and can be passed in a subsequent call through this parameter. See Paging Tokens for more info. |  |

### Example request

```http
GET {{base_url}}/rest/v1/namedAccountLists.json?filterType={{filterType}}&filterValues={{filterValues}}&batchSize={{batchSize}}&nextPageToken={{nextPageToken}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfNamedAccountList`](../models/responseofnamedaccountlist.md)

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
      "createdAt": "string",
      "marketoGUID": "123",
      "name": "Example name",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123,
      "status": "created",
      "type": "string",
      "updateable": false,
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

- [`ResponseOfNamedAccountList`](../models/responseofnamedaccountlist.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
