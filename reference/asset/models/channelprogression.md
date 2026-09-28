# ChannelProgression

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `description` | string | No | Description of the program status |  |
| `hidden` | boolean | No | Whether the status has been hidden |  |
| `name` | string | No | Name of the status |  |
| `type` | string | No | Type of the status |  |
| `step` | integer (int32) | No | Step number of the status |  |
| `success` | boolean | No | Whether this status is a success step for program members |  |

## Generated example

```json
{
  "description": "string",
  "hidden": true,
  "name": "Example name",
  "type": "string",
  "step": 123,
  "success": true
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
