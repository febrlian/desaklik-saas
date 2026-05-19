# Phase 0 Spec

## Purpose

Establish a stable, executable foundation for DesaKlik using a **modular monolith** and simple operations model.

Phase 0 is about reducing risk and enabling steady feature delivery, not maximizing technical novelty.

## Outcomes (must-have)

1. Clear module boundaries in one deployable backend.
2. Shared-schema multi-tenancy with strict tenant isolation conventions.
3. Queue/worker path for heavy async jobs.
4. Observability baseline with latency/error/capacity signals.
5. Backup/restore and basic disaster-recovery readiness.
6. Capacity trigger playbook up to national rollout levels.

## In-Scope

| Area | Scope in Phase 0 |
|---|---|
| Architecture | Modular monolith with internal module boundaries and contracts |
| Data | Shared Postgres schema + `tenant_id` conventions + index discipline |
| Workloads | Sync API for CRUD; async worker for heavy jobs |
| Reliability | Health checks, alert baselines, restore drill |
| Scale readiness | Milestone-based operational upgrades (1k → 83k villages) |

## Out-of-Scope (Not Now)

- Default Kubernetes/EKS deployment
- Service mesh
- Mandatory microservices split per domain
- Multi-region active-active topology
- Polyglot persistence without measured need

## Success Criteria

- Tenant data leakage risk reduced by enforced conventions and tests.
- p95 latencies and error rates are measured and visible.
- Heavy tasks do not block user-facing request paths.
- Scale-readiness triggers are documented with explicit next actions.

## Non-Functional Baseline

- Security: authn/authz + tenant-scoped access checks on every tenant route.
- Performance: endpoint and job SLO targets defined and tracked.
- Operability: one on-call runbook and one backup/restore drill completed.
- Cost: infrastructure defaults stay right-sized; upgrades tied to evidence.

## Canonical References

- [Architecture (modular monolith)](./architecture-modular-monolith.md)
- [Implementation plan](./implementation-plan.md)
- [Actionable tasks](./actionable-tasks.md)
- [Guardrails](./guardrails.md)
- [83,000 Village Scale Readiness (without premature microservices)](./architecture-modular-monolith.md#83000-village-scale-readiness-without-premature-microservices)
