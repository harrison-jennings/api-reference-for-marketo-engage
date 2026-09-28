# EmailContentResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `contentType` | string | Yes | Type of content to set for the section. |  |
| `htmlId` | string | Yes | HTML id of the content section |  |
| `index` | integer (int32) | No |  |  |
| `isLocked` | boolean | No |  |  |
| `parentHtmlId` | string | No |  |  |
| `value` | object | Yes | Contents of the section |  |

## Generated example

```json
{
  "contentType": "string",
  "htmlId": "123",
  "index": 123,
  "isLocked": true,
  "parentHtmlId": "123",
  "value": {}
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
