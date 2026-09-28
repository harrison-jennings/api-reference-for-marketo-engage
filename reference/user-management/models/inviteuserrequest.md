# InviteUserRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `apiOnly` | boolean | No | Whether the user is API-Only.  Default is false |  |
| `emailAddress` | string | Yes | User email address | min length: 1; max length: 2147483647; pattern: `^("?)(?:[^"])(?:[-\w.!#$%&\'*+\/=?^_`{\|}~])*\1@(\w[-\w]{0,62}\.)+[A-Za-z]{2,63}$` |
| `expiresAt` | string | No | Date and time when user login expires.  Must be valid ISO-8601 string.  See <a href="http://developers.marketo.com/rest-api/lead-database/fields/field-types/">Datetime</a> field type description. |  |
| `firstName` | string | Yes | User first name |  |
| `lastName` | string | Yes | User last name |  |
| `userid` | string | No | Marketo Identity users should use an email address. Adobe Identity users should use the generated GUID. |  |
| `reason` | string | No | Reason for user invitation |  |
| `userRoleWorkspaces` | array of [`UserRoleWorkspaceId`](./userroleworkspaceid.md) | Yes |  |  |

## Generated example

```json
{
  "apiOnly": true,
  "emailAddress": "person@example.com",
  "expiresAt": "string",
  "firstName": "Example name",
  "lastName": "Example name",
  "userid": "person@example.com",
  "reason": "string",
  "userRoleWorkspaces": [
    {
      "accessRoleId": 123,
      "workspaceId": 123
    }
  ]
}
```

## Referenced models

- [`UserRoleWorkspaceId`](./userroleworkspaceid.md)

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).
