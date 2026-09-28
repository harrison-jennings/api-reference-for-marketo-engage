# Program Members

Program Members Controller

## Operations

| Method | Path | Operation |
|---|---|---|
| `GET` | `/rest/v1/programs/members/describe.json` | [Describe Program Member](describe-program-member.md) |
| `GET` | `/rest/v1/programs/members/schema/fields.json` | [Get Program Member Fields](get-program-member-fields.md) |
| `POST` | `/rest/v1/programs/members/schema/fields.json` | [Create Program Member Fields](create-program-member-fields.md) |
| `GET` | `/rest/v1/programs/members/schema/fields/{fieldApiName}.json` | [Get Program Member Field by Name](get-program-member-field-by-name.md) |
| `POST` | `/rest/v1/programs/members/schema/fields/{fieldApiName}.json` | [Update Program Member Field](update-program-member-field.md) |
| `GET` | `/rest/v1/programs/{programId}/members.json` | [Get Program Members](get-program-members.md) |
| `POST` | `/rest/v1/programs/{programId}/members.json` | [Sync Program Member Data](sync-program-member-data.md) |
| `POST` | `/rest/v1/programs/{programId}/members/delete.json` | [Delete Program Members](delete-program-members.md) |
| `POST` | `/rest/v1/programs/{programId}/members/status.json` | [Sync Program Member Status](sync-program-member-status.md) |
