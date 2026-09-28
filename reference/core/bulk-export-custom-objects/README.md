# Bulk Export Custom Objects

Bulk Export Custom Objects Controller

## Operations

| Method | Path | Operation |
|---|---|---|
| `GET` | `/bulk/v1/customobjects/{apiName}/export.json` | [Get Export Custom Object Jobs](get-export-custom-object-jobs.md) |
| `POST` | `/bulk/v1/customobjects/{apiName}/export/create.json` | [Create Export Custom Object Job](create-export-custom-object-job.md) |
| `POST` | `/bulk/v1/customobjects/{apiName}/export/{exportId}/cancel.json` | [Cancel Export Custom Object Job](cancel-export-custom-object-job.md) |
| `POST` | `/bulk/v1/customobjects/{apiName}/export/{exportId}/enqueue.json` | [Enqueue Export Custom Object Job](enqueue-export-custom-object-job.md) |
| `GET` | `/bulk/v1/customobjects/{apiName}/export/{exportId}/file.json` | [Get Export Custom Object File](get-export-custom-object-file.md) |
| `GET` | `/bulk/v1/customobjects/{apiName}/export/{exportId}/status.json` | [Get Export Custom Object Job Status](get-export-custom-object-job-status.md) |
