# Bulk Export Activities

Bulk Export Activities Controller

## Operations

| Method | Path | Operation |
|---|---|---|
| `GET` | `/bulk/v1/activities/export.json` | [Get Export Activity Jobs](get-export-activity-jobs.md) |
| `POST` | `/bulk/v1/activities/export/create.json` | [Create Export Activity Job](create-export-activity-job.md) |
| `POST` | `/bulk/v1/activities/export/{exportId}/cancel.json` | [Cancel Export Activity Job](cancel-export-activity-job.md) |
| `POST` | `/bulk/v1/activities/export/{exportId}/enqueue.json` | [Enqueue Export Activity Job](enqueue-export-activity-job.md) |
| `GET` | `/bulk/v1/activities/export/{exportId}/file.json` | [Get Export Activity File](get-export-activity-file.md) |
| `GET` | `/bulk/v1/activities/export/{exportId}/status.json` | [Get Export Activity Job Status](get-export-activity-job-status.md) |
