# LandingPageResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `URL` | string | No | Public URL of the landing page, including the /lp/{munchkinId} path segment |  |
| `computedUrl` | string | No | Url of the asset in the Marketo UI |  |
| `destinationUrl` | string | No | Public URL of the landing page, without the /lp/{munchkinId} path segment |  |
| `createdAt` | string (date-time) | No | Datetime the asset was created |  |
| `customHeadHTML` | string | Yes | Any custom HTML to embed in the <head> tag of the page |  |
| `description` | string | No | Description of the asset |  |
| `facebookOgTags` | string | Yes | Any OpenGraph meta tags to apply to the page |  |
| `folder` | [`Folder`](./folder.md) | No | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `formPrefill` | boolean | No | Boolean to toggle whether forms embedded in the page will prefill. Default false |  |
| `id` | integer (int64) | No | Id of the asset |  |
| `keywords` | string | No |  |  |
| `mobileEnabled` | boolean | No | Whether the page has mobile viewing enabled. Free-form pages only. Default false |  |
| `name` | string | No | Name of the asset |  |
| `robots` | string | Yes | Robots directives to apply to the pages meta tags |  |
| `status` | string | No | Status filter for draft or approved versions |  |
| `template` | integer (int32) | No | Id of the template used |  |
| `title` | string | Yes | Title element of the landing page |  |
| `updatedAt` | string (date-time) | No | Datetime the asset was most recently updated |  |
| `workspace` | string | No | Name of the workspace |  |

## Generated example

```json
{
  "URL": "https://example.com",
  "computedUrl": "https://example.com",
  "destinationUrl": "https://example.com",
  "createdAt": "2026-01-15T10:30:00Z",
  "customHeadHTML": "string",
  "description": "string",
  "facebookOgTags": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "formPrefill": true,
  "id": 123,
  "keywords": "string",
  "mobileEnabled": true,
  "name": "Example name",
  "robots": "string",
  "status": "string",
  "template": 123,
  "title": "string",
  "updatedAt": "2026-01-15T10:30:00Z",
  "workspace": "string"
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
