# ProgramOperation

**Type:** `object`

A program sync operation.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `programId` | integer (int64) | Yes | The Marketo program ID. Must be a positive integer. |  |
| `status` | string | Yes | The program member status to set (e.g. 'Member', 'Influenced'). Must not be 'Not in Program'; use the delete endpoint instead. |  |
| `members` | array of [`ProgramMember`](./programmember.md) | Yes | List of lead references to add or update in the program. |  |

## Generated example

```json
{
  "programId": 1001,
  "status": "Member",
  "members": [
    {
      "leadId": 10001
    }
  ]
}
```

## Referenced models

- [`ProgramMember`](./programmember.md)

## Source

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).
