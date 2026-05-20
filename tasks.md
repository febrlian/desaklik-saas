# Phase 0 Execution Backlog (Reset-Aligned)

This tracker is aligned to `docs/phase-0/*` and intentionally avoids premature complexity.

## How to use this file

- Work top-to-bottom unless blocked.
- Each item is sized to roughly **0.5–2 days**.
- Mark done only when **Acceptance Criteria** and **DoD** are met.

## Backlog

| ID | Task | Est. | Depends On | Acceptance Criteria | DoD |
|---|---|---:|---|---|---|
| P0-01 | Baseline repo cleanup + script sanity (`pnpm` scripts run, dead references removed) | 0.5d | None | All root scripts execute without missing-file errors | Commands and outputs documented in PR notes |
| P0-02 | Define module boundaries in code folders (`apps/api/src/modules/*`) | 1d | P0-01 | Modules mapped to architecture doc with no cross-module direct DB access | Directory + README stubs merged |
| P0-03 | Tenant context middleware and request-scoped `tenant_id` enforcement | 1d | P0-02 | Every tenant-scoped endpoint requires tenant context | Automated tests cover allow/deny paths |
| P0-04 | Shared-schema multi-tenant DB conventions (migrations, composite indexes) | 1d | P0-03 | Tables include tenant convention fields and core composite indexes | Migration up/down verified on local DB |
| P0-05 | Background jobs skeleton (queue + worker + retry/DLQ policy) | 1d | P0-03 | [x] At least 3 job types run async: document generation, notification dispatch, CSV import | [x] Queue metrics visible in logs/metrics |
| P0-06 | Minimal observability baseline (request id, structured logs, latency/error metrics) | 1d | P0-03 | p50/p95 latency + error rate dashboards available | Runbook for alert response committed |
| P0-07 | Performance budget checks in CI (API latency smoke + bundle budget) | 0.5d | P0-06 | CI fails when thresholds exceeded | Thresholds documented in implementation plan |
| P0-08 | Backup/restore drill script and verification checklist | 0.5d | P0-04 | Successful restore to clean environment with integrity checks | Drill date + result recorded |
| P0-09 | Capacity milestone playbook (1k/10k/30k/83k villages) as runbook docs | 1d | P0-04, P0-06 | Runbook defines trigger metrics and exact next actions per milestone | Linked from architecture + implementation docs |
| P0-10 | Service extraction scorecard + decision template | 0.5d | P0-02, P0-06 | Measurable extraction thresholds published and review cadence defined | Template used in one example review |
| P0-11 | National onboarding risk register operationalization | 1d | P0-09 | Top risks have owner, signal, mitigation, fallback | Monthly review cadence documented |
| P0-12 | Phase 0 exit review and sign-off | 0.5d | P0-01..P0-11 | All mandatory checklists complete with evidence links | Sign-off note published in docs |

## Current Priority Sequence

1. P0-01 → P0-04 (tenant-safe core)
2. P0-05 → P0-07 (async + observability)
3. P0-08 → P0-11 (resilience + scale-readiness)
4. P0-12 (formal exit)

## Explicit Not-Now (Phase 0)

- Kubernetes/EKS as default runtime
- Service mesh
- Multi-region active-active
- Breaking modular monolith into many services without threshold evidence
