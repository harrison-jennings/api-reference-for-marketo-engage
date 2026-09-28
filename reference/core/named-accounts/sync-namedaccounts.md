# Sync NamedAccounts

**Method:** `POST`  
**Path:** `/rest/v1/namedaccounts.json`  
**Tag:** Named Accounts  
**Operation ID:** `syncNamedAccountsUsingPOST`  

Allows inserts, updates, or upserts of namedaccounts to the target instance. Required Permissions: Read-Write Named Account

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `syncAccountRequest`  
**Required:** Yes  
**Schema:** [`SyncNamedAccountRequest`](../models/syncnamedaccountrequest.md)

syncAccountRequest

#### Generated example

```json
{
  "action": "createOnly",
  "dedupeBy": "string",
  "input": [
    {
      "marketoGUID": "123",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123,
      "status": "created"
    }
  ]
}
```

### Referenced models

- [`SyncNamedAccountRequest`](../models/syncnamedaccountrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/namedaccounts.json
Content-Type: application/json
Accept: application/json

{
  "action": "createOnly",
  "dedupeBy": "string",
  "input": [
    {
      "marketoGUID": "123",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123,
      "status": "created"
    }
  ]
}
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfNamedAccount`](../models/responseofnamedaccount.md)

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

- [`ResponseOfNamedAccount`](../models/responseofnamedaccount.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
