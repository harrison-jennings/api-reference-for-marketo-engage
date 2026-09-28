# Delete User

**Method:** `POST`  
**Path:** `/userservice/management/v1/users/{userid}/delete.json`  
**Tag:** User Management  
**Operation ID:** `deleteUserUsingPOST`  

Delete user.  Required Permissions: Access User Management Api and Access Users

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `userid` | string | Yes | User id in the form of an email address |  |

### Example request

```http
POST {{base_url}}/userservice/management/v1/users/{{userid}}/delete.json
Accept: application/json
```

## Responses

### 200 — OK

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
