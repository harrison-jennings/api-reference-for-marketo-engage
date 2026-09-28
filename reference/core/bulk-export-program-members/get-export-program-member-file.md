# Get Export Program Member File

**Method:** `GET`  
**Path:** `/bulk/v1/program/members/export/{exportId}/file.json`  
**Tag:** Bulk Export Program Members  
**Operation ID:** `getExportProgramMembersFileUsingGET`  

Returns the file content of an export job. The export job must be in "Completed" state. Use Get Export Program Member Job Status endpoint to retrieve status of export job. Required Permissions: Read-Only Lead<br><br>The file format is specified by calling the Create Export Program Member Job endpoint. The following is an example of the default file format ("CSV").<br><br><code>firstName,lastName,email</code><br><code>Marvin,Gaye,marvin.gaye@motown.com</code>

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `exportId` | string | Yes | Id of export batch job. |  |

### Header parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `Range` | string | No | To support partial retrieval of extracted data, the HTTP header "Range" of type "bytes" may be specified. See RFC 2616 "Range Retrieval Requests" for more information. If the header is not set, the entire contents will be returned. |  |

### Example request

```http
GET {{base_url}}/bulk/v1/program/members/export/{{exportId}}/file.json
Range: {{Range}}
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ObservableOfInputStreamRangeContent`](../models/observableofinputstreamrangecontent.md)

#### Generated example

```json
{}
```

### Referenced models

- [`ObservableOfInputStreamRangeContent`](../models/observableofinputstreamrangecontent.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
