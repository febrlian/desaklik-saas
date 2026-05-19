# Phase 0 Guardrails (Anti-Overengineering)

## Why these guardrails exist

To keep delivery fast, reliable, and affordable while the product and usage patterns are still being validated.

## Default Architecture Guardrails

1. Use a **modular monolith** as default runtime model.
2. Keep one primary relational datastore unless metrics prove otherwise.
3. Move heavy tasks to async workers, not extra services by default.
4. Add infrastructure only after measurable bottlenecks.
5. Prefer managed services over self-managed platform complexity.

## Decision Checklist (must pass before adding complexity)

- [ ] Which user or operator pain does this change solve now?
- [ ] Which metric proves the pain (latency, error rate, cost, throughput)?
- [ ] Can this be solved inside the monolith first?
- [ ] What new operational burden is introduced?
- [ ] Is there an ADR update and rollback plan?

If any answer is unclear, defer the change.

## Non-Goals / Not Now

- Kubernetes/EKS as baseline requirement
- Service mesh and advanced traffic shaping
- Multi-region active-active
- Event-driven everything
- Polyglot services without operational ownership

## Practical Engineering Rules

- Every tenant-owned query must include tenant scope.
- Every heavy job must be asynchronous and idempotent.
- Every new table requires index rationale.
- Every SLO must have a dashboard and alert.
- Every incident class must have a runbook entry.

## Documentation Rules

- `docs/phase-0/*` is canonical for this phase.
- Architectural changes require an ADR.
- Tasks must stay in 0.5–2 day chunks with dependencies and DoD.

## Exit Gate Rule

Phase 0 is complete only when:
- tenant isolation checks pass,
- async workloads are offloaded,
- observability baseline is active,
- restore drill is successful,
- 83,000-village readiness playbook is reviewed.
