# UpdateUserAttributesRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiOnly` | boolean | No | Whether the user is API-Only.  Default is false |  |
| `emailAddress` | string | No | User email address | min length: 1; max length: 2147483647; pattern: `^("?)(?:[^"])(?:[-\w.!#$%&\'*+\/=?^_`{\|}~])*\1@(\w[-\w]{0,62}\.)+[A-Za-z]{2,63}$` |
| `expiresAt` | string | No | Date and time when user login expires.  Example: yyyy-MM-dd'T'HH:mm:ss.SSS't'Z |  |
| `firstName` | string | No | User first name |  |
| `lastName` | string | No | User last name |  |

## Generated example

```json
{
  "apiOnly": true,
  "emailAddress": "person@example.com",
  "expiresAt": "yyyyMMdd'T'HH:mm:ss'.'S't'Z",
  "firstName": "Example name",
  "lastName": "Example name"
}
```

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).
