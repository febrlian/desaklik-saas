# Phase 0 Actionable Tasks

All tasks are sized to roughly **0.5–2 days**, dependency-ordered, and execution-ready.

## Task List

| ID | Task | Est. | Depends On |
|---|---|---:|---|
| T01 | Validate repo baseline and remove broken references | 0.5d | None |
| T02 | Create module folder boundaries and module ownership map | 1d | T01 |
| T03 | Add tenant context middleware and request propagation | 1d | T02 |
| T04 | Enforce tenant-scoped repository patterns + tests | 1d | T03 |
| T05 | Apply tenant-aware schema conventions in migrations | 1d | T04 |
| T06 | Add queue + worker skeleton for heavy jobs | 1d | T03 |
| T07 | Implement document generation async job end-to-end | 1d | T06 |
| T08 | Implement notification dispatch async job | 1d | T06 |
| T09 | Implement bulk import async job | 1d | T06 |
| T10 | Add observability baseline (logs, metrics, traces-lite) | 1d | T04, T06 |
| T11 | Define and enforce initial SLO thresholds in dashboards | 0.5d | T10 |
| T12 | Create DB index review + slow-query runbook | 0.5d | T05, T10 |
| T13 | Run backup/restore drill and publish evidence | 0.5d | T05 |
| T14 | Publish 1k/10k/30k/83k capacity trigger playbook | 1d | T10, T12, T13 |
| T15 | Add service extraction scorecard and review template | 0.5d | T02, T10, T14 |
| T16 | Finalize risk register and Phase 0 sign-off | 1d | T01..T15 |

## Acceptance Criteria + DoD

### T01 — Validate repo baseline and remove broken references
- Acceptance Criteria:
  - Root scripts execute without missing file/module errors.
  - Documentation links are valid.
- DoD:
  - Baseline command output captured in task notes.

### T02 — Create module folder boundaries and module ownership map
- Acceptance Criteria:
  - Modules are explicitly represented in source tree.
  - Ownership map aligns with architecture doc.
- DoD:
  - No cross-module imports outside approved interfaces.

### T03 — Add tenant context middleware and request propagation
- Acceptance Criteria:
  - Tenant context available in all tenant routes.
  - Unauthorized tenant access rejected consistently.
- DoD:
  - Automated tests cover valid/invalid tenant context paths.

### T04 — Enforce tenant-scoped repository patterns + tests
- Acceptance Criteria:
  - Repository methods require tenant filter for tenant-owned data.
  - Guard tests fail on missing tenant predicate.
- DoD:
  - CI test suite includes tenant-isolation checks.

### T05 — Apply tenant-aware schema conventions in migrations
- Acceptance Criteria:
  - Tenant-owned tables include `tenant_id` and required audit columns.
  - Composite indexes support top tenant-scoped access paths.
- DoD:
  - Migration apply + rollback verified in local/staging.

### T06 — Add queue + worker skeleton for heavy jobs
- Acceptance Criteria:
  - Queue processing pipeline operational with retries.
  - Dead-letter handling configured.
- DoD:
  - Worker health and queue depth metrics exposed.

### T07 — Implement document generation async job end-to-end
- Acceptance Criteria:
  - API enqueues document jobs and returns tracking ID.
  - Worker processes jobs with idempotency.
- DoD:
  - Failed job retry behavior tested.

### T08 — Implement notification dispatch async job
- Acceptance Criteria:
  - Notification requests are queued and processed asynchronously.
  - Provider failures handled without blocking API path.
- DoD:
  - Delivery success/failure metrics available.

### T09 — Implement bulk import async job
- Acceptance Criteria:
  - Import processing is asynchronous and resumable.
  - Progress/status endpoint available.
- DoD:
  - Large sample import tested with bounded retries.

### T10 — Add observability baseline (logs, metrics, traces-lite)
- Acceptance Criteria:
  - Structured logs include request ID + tenant ID + module.
  - API latency, error rate, queue metrics are visible.
- DoD:
  - Alert thresholds configured for key failure signals.

### T11 — Define and enforce initial SLO thresholds in dashboards
- Acceptance Criteria:
  - p95 targets documented and shown in dashboard.
  - Alert routes tested.
- DoD:
  - On-call runbook includes SLO breach response steps.

### T12 — Create DB index review + slow-query runbook
- Acceptance Criteria:
  - Slow-query review cadence and owner assigned.
  - Index audit checklist published.
- DoD:
  - At least one review cycle completed.

### T13 — Run backup/restore drill and publish evidence
- Acceptance Criteria:
  - Restore succeeds to clean environment.
  - Data integrity spot checks pass.
- DoD:
  - Drill report includes RTO/RPO observations.

### T14 — Publish 1k/10k/30k/83k capacity trigger playbook
- Acceptance Criteria:
  - Milestones include explicit trigger metrics and response actions.
  - Playbook linked from architecture and implementation docs.
- DoD:
  - Engineering leads sign off on trigger thresholds.

### T15 — Add service extraction scorecard and review template
- Acceptance Criteria:
  - Extraction criteria are measurable and non-ambiguous.
  - Review cadence defined.
- DoD:
  - One module scored using the template.

### T16 — Finalize risk register and Phase 0 sign-off
- Acceptance Criteria:
  - Risk register includes owner, leading signal, mitigation, fallback.
  - Phase 0 checklist complete.
- DoD:
  - Sign-off note published with evidence links.

## Scope Protection (Not Now)

- Kubernetes-first delivery model
- Service mesh adoption
- Mandatory microservice split per module
- Multi-region active-active strategy
