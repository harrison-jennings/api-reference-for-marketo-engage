# User Management

Marketo Engage provides a set of User Management endpoints allow you to perform CRUD operations on user records in Marketo.

## Operations

| Method | Path | Operation |
|---|---|---|
| `GET` | `/userservice/management/v1/users/allusers.json` | [Get Users](get-users.md) |
| `POST` | `/userservice/management/v1/users/invite.json` | [Invite User](invite-user.md) |
| `GET` | `/userservice/management/v1/users/roles.json` | [Get Roles](get-roles.md) |
| `GET` | `/userservice/management/v1/users/workspaces.json` | [Get Workspaces](get-workspaces.md) |
| `POST` | `/userservice/management/v1/users/{userid}/delete.json` | [Delete User](delete-user.md) |
| `GET` | `/userservice/management/v1/users/{userid}/invite.json` | [Get Invited User by Id](get-invited-user-by-id.md) |
| `POST` | `/userservice/management/v1/users/{userid}/invite/delete.json` | [Delete Invited User](delete-invited-user.md) |
| `GET` | `/userservice/management/v1/users/{userid}/roles.json` | [Get Roles and Workspaces by Id](get-roles-and-workspaces-by-id.md) |
| `POST` | `/userservice/management/v1/users/{userid}/roles/create.json` | [Add Roles](add-roles.md) |
| `POST` | `/userservice/management/v1/users/{userid}/roles/delete.json` | [Delete Roles](delete-roles.md) |
| `POST` | `/userservice/management/v1/users/{userid}/update.json` | [Update User Attributes](update-user-attributes.md) |
| `GET` | `/userservice/management/v1/users/{userid}/user.json` | [Get User by Id](get-user-by-id.md) |
