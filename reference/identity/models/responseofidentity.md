# ResponseOfIdentity

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `access_token` | string | Yes | The token that you pass with subsequent calls to authenticate with the target instance |  |
| `scope` | string | Yes | The owning API-only user of the custom service that was used to authenticate |  |
| `expires_in` | integer | Yes | Remaining lifespan of the current token in seconds |  |
| `token_type` | string | Yes | The OAuth authentication method | enum: bearer |

## Generated example

```json
{
  "access_token": "example-token",
  "scope": "string",
  "expires_in": 123,
  "token_type": "bearer"
}
```

## Source

Generated from [`swagger-identity.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-identity.json).
