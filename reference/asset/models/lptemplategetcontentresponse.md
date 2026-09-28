# LpTemplateGetContentResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `content` | string | Yes | HTML content of the landing page template |  |
| `enableMunchkin` | boolean | Yes | Whether to enable munchkin on the derived pages. Defaults to true |  |
| `id` | integer (int32) | Yes | Unique integer id of the template |  |
| `status` | string | Yes | Status filter for draft or approved versions | enum: approved, draft |
| `templateType` | string | Yes | Type of template to create. Defaults to freeForm | enum: guided, freeForm |

## Generated example

```json
{
  "content": "string",
  "enableMunchkin": true,
  "id": 123,
  "status": "approved",
  "templateType": "guided"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
