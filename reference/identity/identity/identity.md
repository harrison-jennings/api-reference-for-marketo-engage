# Identity

**Method:** `GET`  
**Path:** `/identity/oauth/token`  
**Tag:** Identity  
**Operation ID:** `identityUsingGET`  
**Badges:** `MCP`  

Retrieve an access token from Marketo Engage. Calls to this endpoint are not counted towards API call limit.

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `client_id` | string (string) | Yes | Client ID from Admin > Integration > Launchpoint menu. |  |
| `client_secret` | string (string) | Yes | Client Secret from Admin > Integration > Launchpoint menu. |  |
| `grant_type` | string (string) | Yes | Grant type. | enum: client_credentials |

### Example request

```http
GET {{base_url}}/identity/oauth/token?client_id={{client_id}}&client_secret={{client_secret}}&grant_type=client_credentials
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfIdentity`](../models/responseofidentity.md)

#### Generated example

```json
{
  "access_token": "example-token",
  "scope": "string",
  "expires_in": 123,
  "token_type": "bearer"
}
```

### Referenced models

- [`ResponseOfIdentity`](../models/responseofidentity.md)

## Source

Generated from [`swagger-identity.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-identity.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
