# ExportProgramMemberFilter

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `programId` | integer (int32) | No | Id of program to retrieve members from. Cannot be used in combination with "programIds" filter |  |
| `programIds` | array of integer (int32) | No | Array of program ids to retrieve members from. Cannot be used in combination with "programId" filter |  |
| `isExhausted` | boolean | No | Filter program membership records for people who have exhausted content |  |
| `nurtureCadence` | string | No | Filter program membership records for a given nurture cadence | enum: paused, normal |
| `statusNames` | array of string | No | Array of program member status names. Can be default and/or user-defined. Multiple status names are ORed together. |  |
| `updatedAt` | [`DateRange`](./daterange.md) | No | Date range to filter program members on |  |

## Generated example

```json
{
  "programId": 123,
  "programIds": [
    123
  ],
  "isExhausted": true,
  "nurtureCadence": "paused",
  "statusNames": [
    "Example name"
  ],
  "updatedAt": {
    "endAt": "string",
    "startAt": "string"
  }
}
```

## Referenced models

- [`DateRange`](./daterange.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
