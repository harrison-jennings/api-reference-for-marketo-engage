# Bulk Export Leads

Bulk Export Leads Controller

## Operations

| Method | Path | Operation |
|---|---|---|
| `GET` | `/bulk/v1/leads/export.json` | [Get Export Lead Jobs](get-export-lead-jobs.md) |
| `POST` | `/bulk/v1/leads/export/create.json` | [Create Export Lead Job](create-export-lead-job.md) |
| `POST` | `/bulk/v1/leads/export/{exportId}/cancel.json` | [Cancel Export Lead Job](cancel-export-lead-job.md) |
| `POST` | `/bulk/v1/leads/export/{exportId}/enqueue.json` | [Enqueue Export Lead Job](enqueue-export-lead-job.md) |
| `GET` | `/bulk/v1/leads/export/{exportId}/file.json` | [Get Export Lead File](get-export-lead-file.md) |
| `GET` | `/bulk/v1/leads/export/{exportId}/status.json` | [Get Export Lead Job Status](get-export-lead-job-status.md) |
