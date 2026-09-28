# ResponseOfUser

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No | Array of errors that occurred if the request was unsuccessful |  |
| `apiOnly` | boolean | Yes | Whether the user is API-Only |  |
| `emailAddress` | string | Yes | User email address |  |
| `expiresAt` | string | Yes | Date and time when user login expires.  Example: yyyy-MM-dd'T'HH:mm:ss.SSS't'Z |  |
| `lastLoginAt` | string | Yes | Date and time of user's most recent login.  Example: yyyy-MM-dd'T'HH:mm:ss.SSS't'Z |  |
| `failedDeviceCode` | integer (int32) | Yes | Device code for user login failure |  |
| `failedLogins` | integer (int32) | Yes | Count of user login failures |  |
| `firstName` | string | Yes | User first name |  |
| `id` | integer (int32) | Yes | User identifier |  |
| `isLocked` | boolean | Yes | Whether user account is locked |  |
| `lastName` | string | Yes | User last name |  |
| `lockedReason` | string | Yes | Reason that user account is locked |  |
| `optedIn` | boolean | Yes | Whether user has opted in |  |
| `userRoleWorkspaces` | array of [`UserRoleWorkspace`](./userroleworkspace.md) | Yes |  |  |
| `userid` | string | Yes | Marketo Identity users should use an email address. Adobe Identity users should use the generated GUID. |  |

## Generated example

```json
{
  "errors": [
    {
      "code": 123,
      "message": "string"
    }
  ],
  "apiOnly": true,
  "emailAddress": "person@example.com",
  "expiresAt": "yyyy-MM-dd'T'HH:mm:ss.SSS't'Z",
  "lastLoginAt": "yyyy-MM-dd'T'HH:mm:ss.SSS't'Z",
  "failedDeviceCode": 123,
  "failedLogins": 123,
  "firstName": "Example name",
  "id": 123,
  "isLocked": true,
  "lastName": "Example name",
  "lockedReason": "string",
  "optedIn": true,
  "userRoleWorkspaces": [
    {
      "accessRoleId": 123,
      "accessRoleName": "Example name",
      "workspaceId": 123,
      "workspaceName": "Example name"
    }
  ],
  "userid": "person@example.com"
}
```

## Referenced models

- [`Error`](./error.md)
- [`UserRoleWorkspace`](./userroleworkspace.md)

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).
