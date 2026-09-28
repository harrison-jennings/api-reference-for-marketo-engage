# UpdateLandingPageRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `customHeadHTML` | string | No | Any custom HTML to embed in the <head> tag of the page |  |
| `description` | string | No | Description of the asset |  |
| `facebookOgTags` | string | No | Any OpenGraph meta tags to apply to the page |  |
| `keywords` | string | No |  |  |
| `metaTagsDescription` | string | No | Meta description property of the page |  |
| `mobileEnabled` | boolean | No | Whether the page has mobile viewing enabled. Free-form pages only. Default false |  |
| `name` | string | No | Name of the landing page |  |
| `robots` | string | No | Robots directives to apply to the pages meta tags |  |
| `styleOverRide` | string | No | Additional CSS styles to append to the landing page <head> |  |
| `title` | string | No | Title element of the landing page |  |
| `urlPageName` | string | No | URL path of the page. Derived from the name field if unset |  |

## Generated example

```json
{
  "customHeadHTML": "string",
  "description": "string",
  "facebookOgTags": "string",
  "keywords": "string",
  "metaTagsDescription": "string",
  "mobileEnabled": true,
  "name": "Example name",
  "robots": "string",
  "styleOverRide": "string",
  "title": "string",
  "urlPageName": "https://example.com"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
