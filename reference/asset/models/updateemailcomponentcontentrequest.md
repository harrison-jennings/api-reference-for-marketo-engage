# UpdateEmailComponentContentRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `altText` | string | No | Sets the value of the alt parameter for the resulting img element |  |
| `externalUrl` | string | No |  |  |
| `height` | integer (int32) | No | Overrides naitve height of the image. The resulting file will be resized to the given height |  |
| `image` | string | No | Multipart file that allows you to load an image from your computer |  |
| `linkUrl` | string | No |  |  |
| `overWrite` | boolean | No | Allows overwriting of the existing image content section |  |
| `style` | string | No | Sets the value of the style parameter for the content section |  |
| `textValue` | string | No |  |  |
| `type` | string | Yes | Type of content to set for the section. | enum: Text, DynamicContent, Snippet |
| `value` | string | Yes | Value to set for the section. For type Text, the HTML content of the section. For type DynamicContent, the id of the segmentation to use for the content. For type Snippet, the id of the snippet to embed |  |
| `videoUrl` | string | No | Sets the Url of the video element. Videos must be either from YouTube or Vimeo |  |
| `width` | integer (int32) | No | Overrides native width of the image. The resulting file will be resized to the given width |  |

## Generated example

```json
{
  "altText": "string",
  "externalUrl": "https://example.com",
  "height": 123,
  "image": "string",
  "linkUrl": "https://example.com",
  "overWrite": true,
  "style": "string",
  "textValue": "string",
  "type": "Text",
  "value": "string",
  "videoUrl": "https://example.com",
  "width": 123
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
