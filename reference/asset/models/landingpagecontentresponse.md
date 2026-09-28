# LandingPageContentResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `content` | object | No | Content of the section. Expected values vary based on type. Image: An image URL. RichText: HTML Content. HTML: HTML Content. Form: A form id. Rectangle: Empty. Snippet: A snippet id. |  |
| `followupType` | string | No | Follow-up behavior of a form. Only available for form-type content sections. Defaults to form defined behavior. | enum: url, lp, formDefined |
| `followupValue` | string | No | Where to follow-up on form submission. When followupType is lp, accepts the integer id of a landing page. For url, it accepts a url string. |  |
| `formattingOptions` | [`JsonNode`](./jsonnode.md) | No |  |  |
| `id` | object | Yes | Id of the content section, may be a string or an int |  |
| `index` | integer (int32) | No | Index of the content section. Index orients the elements from lowest to highest |  |
| `type` | string | Yes | Type of content section | enum: Image, SocialButton, Form, DynamicContent, Rectangle, Snippet, RichText, HTML, Video, Poll, ReferralOffer, Sweepstakes |

## Generated example

```json
{
  "content": {},
  "followupType": "url",
  "followupValue": "string",
  "formattingOptions": {
    "array": true,
    "bigDecimal": true,
    "bigInteger": true,
    "binary": true,
    "boolean": true,
    "containerNode": true,
    "double": true,
    "float": true,
    "floatingPointNumber": true,
    "int": true,
    "integralNumber": true,
    "long": true,
    "missingNode": true,
    "nodeType": "ARRAY",
    "null": true,
    "number": true,
    "object": true,
    "pojo": true,
    "short": true,
    "textual": true,
    "valueNode": true
  },
  "id": {},
  "index": 123,
  "type": "Image"
}
```

## Referenced models

- [`JsonNode`](./jsonnode.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
