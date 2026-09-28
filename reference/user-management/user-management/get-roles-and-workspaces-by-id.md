# Get Roles and Workspaces by Id

**Method:** `GET`  
**Path:** `/userservice/management/v1/users/{userid}/roles.json`  
**Tag:** User Management  
**Operation ID:** `getUserRolesAndWorkspacesUsingGET`  

Get roles and workspaces for a given user.  Required Permissions: Access User Management Api and Access Users

## Formats

- **Request:** Not specified
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `userid` | string | Yes | User id in the form of an email address |  |

### Example request

```http
GET {{base_url}}/userservice/management/v1/users/{{userid}}/roles.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** array of [`UserRoleWorkspace`](../models/userroleworkspace.md)

#### Generated example

```json
[
  {
    "accessRoleId": 123,
    "accessRoleName": "Example name",
    "workspaceId": 123,
    "workspaceName": "Example name"
  }
]
```

### Referenced models

- [`UserRoleWorkspace`](../models/userroleworkspace.md)

### 401 — Unauthorized

No response schema is defined.

### 403 — Forbidden

No response schema is defined.

### 404 — Not Found

No response schema is defined.

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
