# Recurrence

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `startAt` | string (date-time) | Yes | Datetime of the first scheduled campaign to run. Required if setting recurrence. Not required to create a smart campaign that has no recurrence |  |
| `endAt` | string (date-time) | Yes | Datetime after which no further runs will be automatically scheduled |  |
| `intervalType` | string | Yes | Recurrence interval. Not required to create a smart campaign that has no recurrence | enum: Daily, Weekly, Monthly |
| `interval` | integer (int32) | Yes | Number of interval units between recurrences |  |
| `weekdayOnly` | boolean | Yes | Only run smart campaign on weekdays. May only be set if intervalType is 'Daily'. Defaults to false |  |
| `weekdayMask` | array of string | Yes | String array of empty or one or more of 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'. May only be set if intervalType is 'Weekly' |  |
| `dayOfMonth` | integer (int32) | Yes | Day of the month to recur. Permissible range 1-31. May only be set if intervalType is 'Monthly' and dayOfWeek and weekOfMonth are unset. |  |
| `dayOfWeek` | string (int32) | Yes | Day of the week to recur. May only be set if dayOfMonth is not set, and weekOfMonth is set | enum: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday |
| `weekOfMonth` | integer (int32) | Yes | Week of the month to recur. Permissible range 1-4. May only be set if dayOfMonth is not set, and dayOfWeek is set |  |

## Generated example

```json
{
  "startAt": "2026-01-15T10:30:00Z",
  "endAt": "2026-01-15T10:30:00Z",
  "intervalType": "Daily",
  "interval": 123,
  "weekdayOnly": true,
  "weekdayMask": [
    "string"
  ],
  "dayOfMonth": 123,
  "dayOfWeek": "Monday",
  "weekOfMonth": 123
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
