# Remove Named Account List Members

**Method:** `POST`  
**Path:** `/rest/v1/namedAccountList/{id}/namedAccounts/remove.json`  
**Tag:** Named Account Lists  
**Operation ID:** `removeNamedAccountListMembersUsingPOST`  

Removes named account members from a named account list. Required Permissions: Read-Write Named Account

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | string | Yes | Id of target named account list |  |

### Request body

**Name:** `removeNamedAccountListMemberRequest`  
**Required:** Yes  
**Schema:** [`RemoveNamedAccountListMemberRequest`](../models/removenamedaccountlistmemberrequest.md)

removeNamedAccountListMemberRequest

#### Generated example

```json
{
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

- [`RemoveNamedAccountListMemberRequest`](../models/removenamedaccountlistmemberrequest.md)

### Example request

```http
POST {{base_url}}/rest/v1/namedAccountList/{{id}}/namedAccounts/remove.json
Content-Type: application/json
Accept: application/json

{
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
