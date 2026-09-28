# ProgramMembership

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `acquiredBy` | boolean | No | Whether the lead was acquired by the parent program |  |
| `isExhausted` | boolean | No | Whether the lead is currently exhausted in the stream, if applicable |  |
| `membershipDate` | string | Yes | Date the lead first became a member of the program |  |
| `nurtureCadence` | string | No | Cadence of the parent stream if applicable |  |
| `progressionStatus` | string | Yes | Program status of the lead in the parent program |  |
| `reachedSuccess` | boolean | No | Whether the lead is in a success-status in the parent program |  |
| `stream` | string | No | Stream that the lead is a member of, if the parent program is an engagement program |  |

## Generated example

```json
{
  "acquiredBy": false,
  "isExhausted": false,
  "membershipDate": "string",
  "nurtureCadence": "string",
  "progressionStatus": "string",
  "reachedSuccess": false,
  "stream": "string"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
