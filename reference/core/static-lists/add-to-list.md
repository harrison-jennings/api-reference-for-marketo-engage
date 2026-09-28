# Add to List

**Method:** `POST`  
**Path:** `/rest/v1/lists/{listId}/leads.json`  
**Tag:** Static Lists  
**Operation ID:** `addLeadsToListUsingPOST`  

Adds a given set of person records to a target static list. There is a limit of 300 lead ids per request. Required Permissions: Read-Write Lead

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `listId` | integer (int32) | Yes | Id of target list |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | array of integer (int32) | No | Comma-separated list of lead ids to add to the list | collection format: multi |

### Request body

**Name:** `listOperationRequest`  
**Required:** No  
**Schema:** [`ListOperationRequest`](../models/listoperationrequest.md)

Optional JSON request body for submitting leads

#### Generated example

```json
{
  "input": [
    {
      "id": 123
    }
  ]
}
```

### Referenced models

- [`ListOperationRequest`](../models/listoperationrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/lists/{{listId}}/leads.json?id={{id}}
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "id": 123
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfListOperationOutputData`](../models/responseoflistoperationoutputdata.md)

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
      "id": 123,
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "status": "string"
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

- [`ResponseOfListOperationOutputData`](../models/responseoflistoperationoutputdata.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
