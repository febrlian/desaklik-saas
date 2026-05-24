# Phase 2: Bulk Import Async Job (T09)

## 1. Summary of Implementation
- Implemented T09: Bulk import async job.
- Updated `schema.prisma` with an `ImportJob` model to track the state, file location, and row progression of imported files.
- Created `ImportExportController` to handle `POST /api/v1/imports/citizens` for enqueueing jobs and generating the `PENDING` DB state.
- Extracted and solidified `ImportWorker` consuming the BullMQ `import_queue` to transition states (`PROCESSING`, `COMPLETED`, `FAILED`). Included simulation steps to gracefully handle transient storage timeouts vs fatal CSV parsing payloads.
- Added comprehensive unit-testing for `ImportExportController` and `ImportWorker` mapping against Prisma data changes.
- Checked off T09 in actionable tasks, effectively wrapping up the core modular async backlogs.

## 2. File-by-File Change List
- `apps/api/prisma/schema.prisma`: Added `ImportJob` model and references.
- `apps/api/src/modules/import-export/import-export.module.ts`: Wrote the BullMQ registry wrapper.
- `apps/api/src/modules/import-export/import-export.controller.ts`: API endpoints for enqueue and status check (`GET /jobs/:jobId`).
- `apps/api/src/modules/import-export/import-export.worker.ts`: Worker implementation capturing CSV rows metadata.
- `apps/api/src/modules/import-export/import-export.events.ts`: Global queue event logger tracking specifically for imports.
- `apps/api/src/modules/import-export/import-export.controller.spec.ts` & `import-export.worker.spec.ts`: Isolated unit test suites.
- `docs/phase-0/actionable-tasks.md`: Checked off T09.

## 3. Test Evidence
- Run `pnpm turbo run test`
- Workspace tests passed seamlessly ensuring all queue and DB mock interactions are accurate.
