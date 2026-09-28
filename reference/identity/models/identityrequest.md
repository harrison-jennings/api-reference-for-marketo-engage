# IdentityRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `client_id` | string | Yes | Client ID from Admin > Integration > Launchpoint menu |  |
| `client_secret` | string | Yes | Client Secret from Admin > Integration > Launchpoint menu |  |
| `grant_type` | string | Yes | Grant type | enum: client_credentials |

## Generated example

```json
{
  "client_id": "123",
  "client_secret": "string",
  "grant_type": "client_credentials"
}
```

## Source

Generated from [`swagger-identity.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-identity.json).
