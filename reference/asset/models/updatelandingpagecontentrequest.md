# UpdateLandingPageContentRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `backgroundColor` | string | No | background-color property of the HTML section |  |
| `borderColor` | string | No | border-color property of the HTML section |  |
| `borderStyle` | string | No | border-style property of the HTML section |  |
| `borderWidth` | string | No | border-width property of the HTML section |  |
| `height` | string | No | height property of the HTML section |  |
| `hideDesktop` | boolean | No | Hide the section when displayed on a desktop browser. Default false |  |
| `hideMobile` | boolean | No | Hide the section when displayed on a mobile browser. Default false |  |
| `imageOpenNewWindow` | string | No |  |  |
| `index` | integer (int32) | No | Index of the content section. Determines the order of the section in the landing page |  |
| `left` | string | No | left property of the HTML section |  |
| `linkUrl` | string | No | URL parameter of a link type section |  |
| `opacity` | string | No | opacity property of the HTML section |  |
| `top` | string | No | top property of the HTML section |  |
| `type` | string | Yes | Type of content section | enum: Image, Form, Rectangle, Snippet, RichText, HTML, DynamicContent |
| `value` | string | No | Type of content section |  |
| `width` | string | No | width property of the HTML section |  |
| `zIndex` | string | No | z-index property of the HTML section |  |

## Generated example

```json
{
  "backgroundColor": "string",
  "borderColor": "string",
  "borderStyle": "string",
  "borderWidth": "string",
  "height": "string",
  "hideDesktop": true,
  "hideMobile": true,
  "imageOpenNewWindow": "string",
  "index": 123,
  "left": "string",
  "linkUrl": "https://example.com",
  "opacity": "string",
  "top": "string",
  "type": "Image",
  "value": "string",
  "width": "string",
  "zIndex": "string"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
