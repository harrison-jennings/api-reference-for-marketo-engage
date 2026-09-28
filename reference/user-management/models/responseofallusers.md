# ResponseOfAllUsers

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No | Array of errors that occurred if the request was unsuccessful |  |
| `apiOnly` | boolean | Yes | Whether the user is API-Only |  |
| `emailAddress` | string | Yes | User email address |  |
| `firstName` | string | Yes | User first name |  |
| `id` | integer (int32) | Yes | User identifier |  |
| `lastName` | string | Yes | User last name |  |
| `userid` | string | Yes | Marketo Identity users should use an email address. Adobe Identity users should use the generated GUID. |  |
| `userRoleWorkspaces` | array of [`UserRoleWorkspace`](./userroleworkspace.md) | No | Role and workspace assignments for the user.  Only included when includeRoleWorkspace is true.  Requires the Access Roles permission |  |

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
  "firstName": "Example name",
  "id": 123,
  "lastName": "Example name",
  "userid": "person@example.com",
  "userRoleWorkspaces": [
    {
      "accessRoleId": 123,
      "accessRoleName": "Example name",
      "workspaceId": 123,
      "workspaceName": "Example name"
    }
  ]
}
```

## Referenced models

- [`Error`](./error.md)
- [`UserRoleWorkspace`](./userroleworkspace.md)

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).
