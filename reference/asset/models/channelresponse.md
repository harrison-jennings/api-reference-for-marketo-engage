# ChannelResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `applicableProgramType` | string | Yes | Types of programs to which the channel can apply |  |
| `createdAt` | string (date-time) | Yes | Datetime when the channel was created |  |
| `id` | integer (int32) | Yes | Id of the Channel |  |
| `name` | string | Yes | Name of the Channel |  |
| `progressionStatuses` | array of [`ChannelProgression`](./channelprogression.md) | No | List of available statuses for members of programs with the channel |  |
| `updatedAt` | string (date-time) | Yes | Datetime when the channel was most recently updated |  |

## Generated example

```json
{
  "applicableProgramType": "string",
  "createdAt": "2026-01-15T10:30:00Z",
  "id": 123,
  "name": "Example name",
  "progressionStatuses": [
    {
      "description": "string",
      "hidden": true,
      "name": "Example name",
      "type": "string",
      "step": 123,
      "success": true
    }
  ],
  "updatedAt": "2026-01-15T10:30:00Z"
}
```

## Referenced models

- [`ChannelProgression`](./channelprogression.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
