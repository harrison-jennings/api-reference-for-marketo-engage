# ProgramMemberData

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `leadId` | integer (int64) | Yes | Unique integer id of a lead record |  |
| `{fieldApiName}` | string | Yes | API Name of field to update. Must be updateable as described by <a href="/rest-api/endpoint-reference/lead-database-endpoint-reference/#/Leads/describeProgramMemberUsingGET2">Describe Program Member</a> endpoint. |  |
| `{fieldApiName2}` | string | No | API Name of another field to update (and so forth). Must be updateable as described by <a href="/rest-api/endpoint-reference/lead-database-endpoint-reference/#/Leads/describeProgramMemberUsingGET2">Describe Program Member</a> endpoint. |  |

## Generated example

```json
{
  "leadId": 123,
  "{fieldApiName}": "Example name",
  "{fieldApiName2}": "Example name"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
