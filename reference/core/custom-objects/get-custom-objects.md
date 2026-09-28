# Get Custom Objects

**Method:** `GET`  
**Path:** `/rest/v1/customobjects/{customObjectName}.json`  
**Tag:** Custom Objects  
**Operation ID:** `getCustomObjectsUsingGET`  

Retrieves a list of custom objects records based on filter and set of values. There are two unique types of requests for this endpoint: one is executed normally using a GET with URL parameters, the other is by passing a JSON object in the body of a POST and specifying _method=GET in the querystring. The latter is used when dedupeFields attribute has more than one field, which is known as a "compound key". Required Permissions: Read-Only Custom Object, Read-Write Custom Object

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `customObjectName` | string | Yes | Name of custom object type to retrieve records for |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `filterType` | string | Yes | Field to filter on. Searchable fields can be retrieved with Describe Custom Object |  |
| `filterValues` | array of string | Yes | Comma-separated list of field values to match against. | collection format: multi |
| `fields` | array of string | No | Comma-separated list of fields to return for each record. If unset marketoGuid, dedupeFields, updatedAt, createdAt will be returned | collection format: multi |
| `batchSize` | integer (int32) | No | The batch size to return. The max and default value is 300. |  |
| `nextPageToken` | string | No | A token will be returned by this endpoint if the result set is greater than the batch size and can be passed in a subsequent call through this parameter. See Paging Tokens for more info. |  |

### Request body

**Name:** `customObjectLookupRequest`  
**Required:** No  
**Schema:** [`LookupCustomObjectRequest`](../models/lookupcustomobjectrequest.md)

Optional JSON request for retrieving custom objects with compound keys. Example:<br><code>{<br>"filterType":"dedupeFields",<br>"fields":[<br>"marketoGuid",<br>"Bedrooms",<br>"yearBuilt"<br>],<br>"input":[<br>{<br>"mlsNum":"1962352",<br>"houseOwnerId":"42645756"<br>},<br>{<br>"mlsNum":"3962352",<br>"houseOwnerId":"62645756"<br>}<br>]<br>}</code><br>

#### Generated example

```json
{
  "batchSize": 123,
  "fields": [
    "string"
  ],
  "filterType": "string",
  "input": [
    {
      "marketoGUID": "123",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123
    }
  ],
  "nextPageToken": "example-token"
}
```

### Referenced models

- [`LookupCustomObjectRequest`](../models/lookupcustomobjectrequest.md)

### Example request

```http
GET {{base_url}}/rest/v1/customobjects/{{customObjectName}}.json?filterType={{filterType}}&filterValues={{filterValues}}&fields={{fields}}&batchSize={{batchSize}}&nextPageToken={{nextPageToken}}
Content-Type: application/json
Accept: application/json

{
  "batchSize": 123,
  "fields": [
    "string"
  ],
  "filterType": "string",
  "input": [
    {
      "marketoGUID": "123",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123
    }
  ],
  "nextPageToken": "example-token"
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfCustomObject`](../models/responseofcustomobject.md)

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
      "marketoGUID": "123",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123
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

- [`ResponseOfCustomObject`](../models/responseofcustomobject.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
