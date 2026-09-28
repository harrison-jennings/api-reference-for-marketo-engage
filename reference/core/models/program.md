# Program

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int64) | Yes | Unique integer id of a program record |  |
| `acquiredBy` | boolean | Yes | Whether the lead was acquired by the parent program |  |
| `isExhausted` | boolean | Yes | Whether the lead is currently exhausted in the stream, if applicable |  |
| `membershipDate` | string | Yes | Date the lead first became a member of the program |  |
| `nurtureCadence` | string | No | Cadence of the parent stream if applicable |  |
| `progressionStatus` | string | Yes | Program status of the lead in the parent program |  |
| `reachedSuccess` | boolean | Yes | Whether the lead is in a success-status in the parent program |  |
| `stream` | string | No | Stream that the lead is a member of, if the parent program is an engagement program |  |
| `updatedAt` | string | Yes | Datetime when the program was most recently updated |  |

## Generated example

```json
{
  "id": 123,
  "acquiredBy": false,
  "isExhausted": false,
  "membershipDate": "string",
  "nurtureCadence": "string",
  "progressionStatus": "string",
  "reachedSuccess": false,
  "stream": "string",
  "updatedAt": "string"
}
```

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
