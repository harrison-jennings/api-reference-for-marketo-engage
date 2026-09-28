# Add Roles

**Method:** `POST`  
**Path:** `/userservice/management/v1/users/{userid}/roles/create.json`  
**Tag:** User Management  
**Operation ID:** `addRolesUsingPOST`  

Add roles to a user.  Required Permissions: Access User Management Api and Access Users

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `userid` | string | Yes | User id in the form of an email address |  |

### Request body

**Name:** `addRolesRequest`  
**Required:** Yes  
**Schema:** [`AddRolesRequest`](../models/addrolesrequest.md)

addRolesRequest

#### Generated example

```json
{
  "input": [
    {
      "accessRoleId": 123,
      "workspaceId": 123
    }
  ]
}
```

### Referenced models

- [`AddRolesRequest`](../models/addrolesrequest.md)

### Example request

```http
POST {{base_url}}/userservice/management/v1/users/{{userid}}/roles/create.json
Content-Type: application/json
Accept: application/json

{
  "input": [
    {
      "accessRoleId": 123,
      "workspaceId": 123
    }
  ]
}
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

### 201 — Created

No response schema is defined.

### 401 — Unauthorized

No response schema is defined.

### 403 — Forbidden

No response schema is defined.

### 404 — Not Found

No response schema is defined.

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
