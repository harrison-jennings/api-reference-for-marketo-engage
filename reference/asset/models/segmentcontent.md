# SegmentContent

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `content` | object | Yes | Type of content section |  |
| `followupType` | string | No |  |  |
| `followupValue` | string | No |  |  |
| `segmentId` | integer (int32) | Yes | Segmentation to which the section is linked |  |
| `segmentName` | string | Yes | Name of the segment to display content section for |  |
| `type` | string | Yes | Type of content section |  |

## Generated example

```json
{
  "content": {},
  "followupType": "string",
  "followupValue": "string",
  "segmentId": 123,
  "segmentName": "Example name",
  "type": "string"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
