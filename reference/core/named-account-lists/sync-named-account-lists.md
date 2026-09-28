# Sync Named Account Lists

**Method:** `POST`  
**Path:** `/rest/v1/namedAccountLists.json`  
**Tag:** Named Account Lists  
**Operation ID:** `syncNamedAccountListsUsingPOST`  

Creates and/or updates named account list records. Required Permissions: Read-Write Named Account List

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `syncNamedAccountListRequest`  
**Required:** Yes  
**Schema:** [`SyncNamedAccountListRequest`](../models/syncnamedaccountlistrequest.md)

syncNamedAccountListRequest

#### Generated example

```json
{
  "action": "createOnly",
  "dedupeBy": "string",
  "input": [
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
  ]
}
```

### Referenced models

- [`SyncNamedAccountListRequest`](../models/syncnamedaccountlistrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/namedAccountLists.json
Content-Type: application/json
Accept: application/json

{
  "action": "createOnly",
  "dedupeBy": "string",
  "input": [
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
  ]
}
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
