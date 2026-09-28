# ResponseOfInvitedUser

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No | Array of errors that occurred if the request was unsuccessful |  |
| `id` | integer (int32) | Yes | User identifier |  |
| `firstName` | string | Yes | User first name |  |
| `lastName` | string | Yes | User last name |  |
| `emailAddress` | string | Yes | User email address |  |
| `userid` | string | Yes | Marketo Identity users should use an email address. Adobe Identity users should use the generated GUID. |  |
| `subscriptionId` | string | Yes | Subscription ID |  |
| `status` | string | Yes | User status | enum: pending |
| `expiresAt` | string | Yes | Date and time when user login expires.  Example: yyyy-MM-dd'T'HH:mm:ss.SSS't'Z |  |
| `createdAt` | string | Yes | Date and time when user login was created.  Example: yyyy-MM-dd'T'HH:mm:ss.SSS't'Z |  |
| `updatedAt` | string | Yes | Date and time when user login was last updated.  Example: yyyy-MM-dd'T'HH:mm:ss.SSS't'Z |  |

## Generated example

```json
{
  "errors": [
    {
      "code": 123,
      "message": "string"
    }
  ],
  "id": 123,
  "firstName": "Example name",
  "lastName": "Example name",
  "emailAddress": "person@example.com",
  "userid": "person@example.com",
  "subscriptionId": "123",
  "status": "pending",
  "expiresAt": "yyyy-MM-dd'T'HH:mm:ss.SSS't'Z",
  "createdAt": "yyyy-MM-dd'T'HH:mm:ss.SSS't'Z",
  "updatedAt": "yyyy-MM-dd'T'HH:mm:ss.SSS't'Z"
}
```

## Referenced models

- [`Error`](./error.md)

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).
