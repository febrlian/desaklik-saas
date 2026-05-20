# Phase 1: Background Jobs Skeleton (P0-05)

## 1. Summary of Implementation
- Configured a `QueueFoundationModule` using BullMQ + Redis, establishing the baseline for all async jobs.
- Implemented queue options per Phase 0 guidance: exponential backoff for retries, strict timeouts, and a 7-day retention policy for failed jobs (serving as our baseline DLQ).
- Built worker skeletons for `document.generate` and `import.process` to handle heavy tasks completely asynchronously.
- Implemented a `PlatformController` API with an admin route to manually retry failed jobs from the DLQ.
- Added comprehensive `QueueLogger` observability, triggering on `added`, `completed`, `failed`, and `error` queue events.
- Ensured tenant context is required (`BaseJobPayload.tenantId`) to strictly isolate multi-tenant operations.

## 2. File-by-File Change List
- `package.json`: Added `@nestjs/bullmq`, `bullmq`, `ioredis`.
- `apps/api/src/common/queue/queue.module.ts`: Configured the Redis connection and global BullMQ retry/DLQ behaviors.
- `apps/api/src/common/queue/job-types.ts`: Defined centralized queue and job constants.
- `apps/api/src/common/queue/queue.logger.ts`: Created the events logger for observable queue states.
- `apps/api/src/modules/document/document.module.ts`, `document.controller.ts`, `document.worker.ts`, `document.events.ts`: Fully connected queue, worker, logging, and endpoints.
- `apps/api/src/modules/import-export/import-export.module.ts`, `import-export.controller.ts`, `import-export.worker.ts`: Fully connected import queue components.
- `apps/api/src/modules/platform/platform.module.ts`, `platform.controller.ts`: Built the manual DLQ retry capability (`/api/v1/platform/jobs/retry/:queueName/:jobId`).
- `apps/api/src/app.module.ts`: Registered all new queues.
- `apps/api/.env` and `INFRA_SETUP.md`: Added setup instructions for Redis usage.
- `tasks.md`: Checked off `P0-05`.

## 3. Queue/DLQ Design Decisions
- **Why BullMQ?** BullMQ operates robustly on top of Redis without introducing complex, hard-to-debug event buses or Kafka, perfectly fitting our "modular monolith first" restriction.
- **DLQ Strategy:** BullMQ handles failed jobs intrinsically via its `failed` set. We configured `removeOnFail: { age: 24 * 3600 * 7 }` which persists failed tasks for 7 days, acting as a functional DLQ without requiring an entirely separate storage table right away.
- **Replay Path:** Added `/api/v1/platform/jobs/retry/:queueName/:jobId` to programmatically retry these failed jobs when an operator investigates and fixes the root cause.
- **Tenant Safety:** Forced all payloads to implement `BaseJobPayload` which demands a `tenantId`.

## 4. Test Evidence
- Run `cd apps/api && pnpm run test src/modules/document/document.worker.spec.ts`
- Tests passed:
  - `should process document correctly` (Validates normal process path)
  - `should handle fatal error without retries if explicitly coded` (Validates the failure path -> DLQ logic)

## 5. Deferred Items + Recommended Next 5 Tasks
- Full implementation of actual document generation (PDF rendering logic) is deferred until T07.
- Full implementation of actual CSV import parsing logic is deferred until T09.

**Recommended Next 5 Tasks (from backlog):**
1. **P0-06:** Minimal observability baseline (request id, structured logs, latency/error metrics).
2. **P0-07:** Performance budget checks in CI (API latency smoke + bundle budget).
3. **P0-08:** Backup/restore drill script and verification checklist.
4. **P0-09:** Capacity milestone playbook (1k/10k/30k/83k villages) as runbook docs.
5. **P0-10:** Service extraction scorecard + decision template.
