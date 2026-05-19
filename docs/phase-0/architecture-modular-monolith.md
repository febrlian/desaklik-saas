# Architecture: Modular Monolith First

## Decision Summary

DesaKlik runs as a **modular monolith first**: one deployable backend, one primary relational database, clear internal module boundaries, and asynchronous workers for heavy tasks.

This is the fastest path to reliable delivery while preserving future extraction options.

Reference ADR: [ADR-001](../adr/ADR-001-modular-monolith-first.md)

## Architecture Principles

1. **One deployable unit now** (simpler testing, release, and rollback).
2. **Strict internal boundaries** (module APIs, no arbitrary cross-module DB reads).
3. **Async for heavy work** (keep request path fast).
4. **Evidence-driven scaling** (upgrade only when thresholds are hit).
5. **Operational simplicity first** (managed services before custom platform work).

## Module Layout (Logical)

| Module | Responsibilities | Owns Data | Exposes |
|---|---|---|---|
| IAM & Tenant Context | authentication, role mapping, tenant context resolution | users, memberships, tenant bindings | auth/session APIs, tenant context middleware |
| Village Profile | village identity, metadata, settings | villages, village_settings | profile read/write APIs |
| Citizen Registry | household and citizen records | households, residents | CRUD + search APIs |
| Document Service | document templates, generation requests, archives | templates, documents, document_jobs | document APIs + async jobs |
| Notification | outbound notifications (WA/email/SMS abstraction) | notification_events | enqueue APIs + delivery worker |
| Import/Export | batch import and export flows | import_jobs, export_jobs | upload/start/status APIs |
| Reporting & Analytics | pre-aggregated metrics for dashboards | materialized views/summary tables | analytics read APIs |
| Platform Ops | audit logs, feature flags, operational settings | audit_log, feature_flags | ops APIs |

## Communication Rules

- Sync calls are allowed only through module interfaces.
- Cross-module side effects use domain events/outbox style records.
- No module may query another module’s private tables directly.

## Data and Tenancy Baseline

- Shared schema in one Postgres cluster.
- Tenant-scoped tables include: `tenant_id`, `created_at`, `updated_at`, `created_by` (where relevant).
- Composite indexes prioritize tenant-scoped reads (example pattern: `(tenant_id, <high-selectivity-column>)`).
- Write path must carry tenant context from request to repository layer.

## Deployment Baseline (Phase 0)

- One API service + one worker service.
- One managed Postgres primary.
- One queue backend (managed where possible).
- One cache layer only when hot-path evidence exists.

Not default in Phase 0: service mesh, multi-cluster orchestration, cross-region active-active.

---

## 83,000 Village Scale Readiness (without premature microservices)

> Execution cross-link: [Implementation plan scale section](./implementation-plan.md#83000-village-scale-readiness-without-premature-microservices)

### 1) Multi-tenant data model strategy

**Model**: shared schema + strict `tenant_id` conventions.

| Topic | Phase 0 Rule |
|---|---|
| Tenant key | `tenant_id` required on tenant-owned tables |
| Query pattern | every read/write filter includes `tenant_id` first |
| Uniqueness | tenant-scoped unique constraints (`tenant_id` + business key) |
| RLS intent | row-level security policy model designed and incrementally enabled as enforcement hardening |
| Access patterns | request-scoped tenant context; no global scans in user flows |

Implementation intent:
- Keep cross-tenant admin/reporting paths explicit and separately permissioned.
- Add repository-level guards so missing tenant filters fail tests.

### 2) Capacity milestones and triggers

| Milestone | Typical Scale Signal | What Changes (and what does not) |
|---|---|---|
| 1k villages | steady early production traffic | enforce index hygiene, baseline dashboards, queue retries; still monolith |
| 10k villages | rising concurrent usage + bigger imports | add read replica for heavy reads, introduce partitioning plan for largest tables |
| 30k villages | regional peaks, higher async backlog | partition selected large tables, add worker autoscaling rules, tighten SLO alerts |
| 83k villages | national rollout cadence | multi-replica reads, formal DR drills, selective service extraction only by thresholds |

Trigger rule: changes are activated by measured bottlenecks (latency, saturation, queue delay, failure rate), not by projected fear.

### 3) Database scaling plan

- **Indexing**: tenant-first composite indexes for top read/write paths; remove unused indexes quarterly.
- **Partitioning guidance**: apply only to largest write-heavy or time-series tables after observed bloat/slow maintenance.
- **Read replicas**: add when read-heavy analytics/report queries impact primary write latency.
- **Backup/restore**: daily backups + PITR capability; quarterly restore drill with evidence.
- **DR basics**: documented RTO/RPO targets, runbook ownership, and failover rehearsal.

### 4) Async workload strategy

Move heavy operations off request path:
- document generation
- notification dispatch
- bulk imports
- analytics materialization

Queue/worker policy baseline:
- idempotent job handlers
- bounded retries + dead-letter queue
- per-job observability (queued/running/failed/success latency)

### 5) Performance SLO guidance + observability baseline

Example Phase 0 targets (adjust with real usage):

| Surface | SLO Target (p95 unless stated) |
|---|---|
| Auth/session endpoints | < 300 ms |
| Standard CRUD endpoints | < 500 ms |
| Search/list endpoints | < 800 ms |
| Async job start acknowledgement | < 250 ms |
| Queue delay (p95) | < 60 s |
| Error rate | < 1% for core APIs |

Observability baseline:
- structured logs with request/tenant/job IDs
- API latency and error metrics by module
- queue depth, queue delay, retry/dead-letter metrics
- DB slow query tracking and connection saturation alerts

### 6) Cost-efficiency controls

- right-size compute before scale-out
- cache only for proven hot read paths
- cap log/trace volume with retention budgets
- avoid maintaining parallel infra stacks without usage proof
- set monthly cost review with “top 3 waste sources” action list

### 7) Service extraction criteria (measurable)

Split a module into an independent service only if **2+ criteria hold for 2 consecutive review cycles**:

1. Module owns >30% of compute or DB load and impacts others.
2. Independent scaling need cannot be solved by worker/API split inside monolith.
3. Deployment frequency/risk profile is substantially different from rest of monolith.
4. Clear bounded context with minimal synchronous coupling.
5. Team can support added ops burden (on-call, CI/CD, observability, security patching).

If criteria are not met, keep module in monolith and optimize internally.

### 8) National-scale onboarding risk register + mitigation checklist

| Risk | Signal | Mitigation | Owner |
|---|---|---|---|
| Tenant data leakage | cross-tenant query incidents | mandatory tenant guards + security tests + RLS rollout | backend lead |
| Queue overload | growing queue delay/backlog | autoscale workers + rate limit bulk operations | platform lead |
| DB saturation | high CPU/IO + slow queries | indexing, query tuning, read replicas, partition targeted tables | data lead |
| Incident response lag | prolonged MTTR | runbooks + drills + alert routing improvements | ops lead |
| Cost spike during onboarding | cost/tenant rises sharply | right-size rules + spend alerts + retention tuning | engineering manager |

Checklist before major onboarding wave:
- [ ] Restore drill completed in last quarter
- [ ] Capacity dashboards reviewed and signed off
- [ ] Queue retry/DLQ policies validated
- [ ] SLO compliance above threshold for prior 30 days
- [ ] Top 5 slow queries addressed
- [ ] Support/on-call staffing confirmed

## Non-Goals (Phase 0)

- Rebuilding the platform around many services early.
- Introducing complex orchestration layers without proven need.
- Solving all future national-scale problems before first stable production loops.
