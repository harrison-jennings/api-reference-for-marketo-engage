# CreateLandingPageRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `customHeadHTML` | string | No | Any custom HTML to embed in the <head> tag of the page |  |
| `description` | string | No | Description of the asset |  |
| `facebookOgTags` | string | No | Any OpenGraph meta tags to apply to the page |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `keywords` | string | No |  |  |
| `mobileEnabled` | boolean | No | Whether the page has mobile viewing enabled. Free-form pages only. Default false |  |
| `name` | string | Yes | Name of the landing page |  |
| `prefillForm` | boolean | No | Boolean to toggle whether forms embedded in the page will prefill. Default false |  |
| `robots` | string | No | Robots directives to apply to the pages meta tags |  |
| `template` | integer (int32) | Yes | Id of the template used |  |
| `title` | string | No | Title element of the landing page |  |
| `urlPageName` | string | No | URL path of the page. Derived from the name field if unset |  |
| `workspace` | string | No | Name of the workspace |  |

## Generated example

```json
{
  "customHeadHTML": "string",
  "description": "string",
  "facebookOgTags": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "keywords": "string",
  "mobileEnabled": true,
  "name": "Example name",
  "prefillForm": true,
  "robots": "string",
  "template": 123,
  "title": "string",
  "urlPageName": "https://example.com",
  "workspace": "string"
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
