# Lead

**Type:** `object`

Lead record. Always contains id, but may have any number of other fields, depending on the fields available in the target instance.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | No | Unique integer id of a lead record |  |
| `membership` | [`ProgramMembership`](./programmembership.md) | No | Membership data for the parent program. Only returned via Get Leads By Program Id |  |
| `reason` | [`Reason`](./reason.md) | No | Reason object describing why an operation did not succeed for a record |  |
| `status` | string | No | Status of the operation performed on the record |  |

## Generated example

```json
{
  "id": 123,
  "membership": {
    "acquiredBy": false,
    "isExhausted": false,
    "membershipDate": "string",
    "nurtureCadence": "string",
    "progressionStatus": "string",
    "reachedSuccess": false,
    "stream": "string"
  },
  "reason": {
    "code": "string",
    "message": "string"
  },
  "status": "string"
}
```

## Referenced models

- [`ProgramMembership`](./programmembership.md)
- [`Reason`](./reason.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
