# Get Invited User by Id

**Method:** `GET`  
**Path:** `/userservice/management/v1/users/{userid}/invite.json`  
**Tag:** User Management  
**Operation ID:** `getInvitedUserUsingGET`  

Retrieve a single pending user record through its Id.  A pending user is a user that has not yet accepted invitation.  Required Permissions: Access User Management Api and Access Users

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
GET {{base_url}}/userservice/management/v1/users/{{userid}}/invite.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfInvitedUser`](../models/responseofinviteduser.md)

#### Generated example

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

### Referenced models

- [`ResponseOfInvitedUser`](../models/responseofinviteduser.md)

### 401 — Unauthorized

No response schema is defined.

### 403 — Forbidden

No response schema is defined.

### 404 — Not Found

No response schema is defined.

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
