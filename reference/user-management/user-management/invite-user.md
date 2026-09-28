# Invite User

**Method:** `POST`  
**Path:** `/userservice/management/v1/users/invite.json`  
**Tag:** User Management  
**Operation ID:** `inviteUserUsingPOST`  

Send an email invitation to new user.  Required Permissions: Access User Management Api and Access Users

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Request body

**Name:** `inviteUserRequest`  
**Required:** Yes  
**Schema:** [`InviteUserRequest`](../models/inviteuserrequest.md)

inviteUserRequest

#### Generated example

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

### Referenced models

- [`InviteUserRequest`](../models/inviteuserrequest.md)

### Example request

```http
POST {{base_url}}/userservice/management/v1/users/invite.json
Content-Type: application/json
Accept: application/json

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

## Responses

### 200 — OK

**Schema:** string

#### Generated example

```json
"string"
```

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
