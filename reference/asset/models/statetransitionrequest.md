# StateTransitionRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `contentId` | string | Yes |  |  |
| `action` | string | Yes | The state transition action to perform on the asset | enum: approve, unapprove, discard, create_draft |

## Generated example

```json
{
  "contentId": "123",
  "action": "approve"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
