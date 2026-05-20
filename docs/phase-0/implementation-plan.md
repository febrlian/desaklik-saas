# Phase 0 Implementation Plan

Reference architecture: [Modular Monolith First](./architecture-modular-monolith.md)

## Plan Objective

Deliver a production-ready baseline with tenant safety, predictable performance, and scale-readiness without premature microservices.

## Execution Sequence

| Stage | Duration | Output | Exit Gate |
|---|---:|---|---|
| Stage 1: Foundation reset | 2–3 days | module skeletons, script sanity, baseline conventions | repo builds/runs with no missing dependency paths |
| Stage 2: Tenant-safe core | 3–4 days | tenant context enforcement + shared-schema conventions | tenant isolation tests passing |
| Stage 3: Async + observability | 3–4 days | worker/queue, structured logs, core metrics | p95/error/queue dashboards live |
| Stage 4: Resilience baseline | 2–3 days | backup/restore drill + DR runbook | restore drill evidence published |
| Stage 5: Scale-readiness operationalization | 3–4 days | capacity trigger playbooks + extraction scorecard | 1k/10k/30k/83k playbook approved |
| Stage 6: Phase 0 closeout | 1 day | checklist completion + sign-off | all mandatory tasks complete |

## Workstream Breakdown

### A) Module and tenancy hardening

- Define module ownership and interfaces.
- Add request-scoped tenant context middleware.
- Enforce repository-level tenant filters and tests.

### B) Performance and async resilience

- Add queue/worker for heavy jobs.
- Instrument API/job latency, errors, and queue metrics.
- Set enforceable budgets in CI for obvious regressions.

### C) Operations and reliability

- Publish restore procedure.
- Run backup/restore drill and capture proof.
- Assign incident ownership and escalation path.

### D) Scale and cost governance

- Publish capacity milestone triggers.
- Add service extraction scorecard.
- Set monthly cost and performance review cadence.

## 83,000 Village Scale Readiness (without premature microservices)

> Canonical architecture details: [Architecture scale-readiness section](./architecture-modular-monolith.md#83000-village-scale-readiness-without-premature-microservices)

This section operationalizes the architecture guidance into implementation checkpoints.

### Implementation checkpoints by milestone

| Milestone | Mandatory Checks | Required Change Set |
|---|---|---|
| 1k villages | tenant guard tests + baseline SLO dashboards | finalize index baseline and queue retries |
| 10k villages | DB read pressure review + async backlog trend | add read replica for heavy reads if trigger hit |
| 30k villages | peak-hour latency review + worker saturation review | partition largest qualifying tables, tune workers |
| 83k villages | DR readiness + national onboarding rehearsal | enforce runbooks, selective extraction only by criteria |

### Required deliverables for scale readiness

1. **Multi-tenancy data discipline**
   - Shared schema remains default.
   - `tenant_id` enforced in table design and query patterns.
   - RLS rollout plan maintained and tested.
2. **Database scaling readiness**
   - Index audit cadence set.
   - Partitioning candidates listed with trigger thresholds.
   - Replica and backup/restore procedures validated.
3. **Async operations maturity**
   - Heavy jobs routed through queue/worker path.
   - Retries, DLQ, and idempotency verified.
4. **SLO + observability readiness**
   - p95 latency and error targets tracked by module.
   - queue depth/delay and DB saturation alerting active.
5. **Cost controls active**
   - right-sizing review documented monthly.
   - log/trace retention budgets enforced.
6. **Extraction governance active**
   - service extraction scorecard reviewed at each milestone.
   - no extraction without measurable threshold evidence.
7. **Risk register maintained**
   - onboarding risks have owner/signal/mitigation.
   - readiness checklist completed before large onboarding waves.

## Definition of Done (Phase 0)

- [ ] All tasks in `phase-0/actionable-tasks.md` marked complete with evidence links.
- [ ] SLO dashboards and alert routing tested.
- [ ] Restore drill successful and documented.
- [ ] Capacity trigger playbook reviewed and assigned owners.
- [ ] ADRs current and accepted by engineering leads.

## Not Now (explicit scope protection)

- Broad service decomposition without threshold evidence.
- Platform migration to orchestration-heavy infrastructure by default.
- Multi-region active-active before single-region operational maturity.

### Phase 1 Performance Budgets (P0-07)
As part of our commitment to avoiding overengineering, we are instituting conservative CI performance budgets. These budgets are enforced directly in the deployment pipeline via `pnpm test:perf`.

**1. API Latency Smoke Budget**
*   **Threshold:** p95 Latency <= 350ms, Error Rate < 1%
*   **Rationale:** Even with minimal optimization, a shared-schema multi-tenant baseline should be fast. 350ms gives plenty of headroom for synchronous ops.
*   **Tuning:** Modify `P95_THRESHOLD_MS` in `apps/api/scripts/smoke-test.js` when adding heavier synchronous read payloads or introducing cross-tenant aggregations.

**2. Frontend Bundle Size Budget**
*   **Threshold:** Shared JS <= 300kB, Largest Route <= 450kB
*   **Rationale:** Since rural operators are the primary users, first-load payload is heavily correlated to perceived performance. These limits are very achievable in Next.js 14 App Router.
*   **Tuning:** Modify `BUDGET_SHARED_JS_KB` in `apps/web/scripts/check-bundle.js` only if a globally mandated third-party package (like a specialized charting library) becomes necessary.
