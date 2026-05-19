# ADR-002: Infrastructure Simplicity First

- **Status**: Accepted
- **Date**: 2026-05-19

## Context

Early-stage systems often fail from operational complexity rather than raw scale. DesaKlik requires predictable operations across many tenants and regions, but current risk is execution inconsistency, not immediate platform limits.

## Decision

Use the simplest infra that meets current SLO and reliability goals:
- managed Postgres primary,
- one API service + one worker service,
- one queue backend,
- observability baseline (logs/metrics/alerts),
- backup/PITR and restore drills.

Do **not** adopt Kubernetes-first, service mesh, or multi-region active-active by default in Phase 0.

## Consequences

### Positive
- Reduced ops overhead and faster troubleshooting.
- Lower infrastructure cost and fewer moving parts.
- Better focus on tenant safety and product delivery.

### Trade-offs
- Some scaling levers arrive later than in platform-heavy setups.
- Requires careful capacity monitoring to scale in time.

### Mitigations
- Capacity trigger playbooks at 1k/10k/30k/83k villages.
- Quarterly backup/restore drills and DR runbook updates.
- Threshold-based upgrades (replicas, partitioning, worker autoscaling).

## Revisit Triggers

Revisit when one or more are sustained:
1. SLO breaches continue after right-sizing and query/workload tuning.
2. Single-environment release cadence becomes a clear delivery bottleneck.
3. Incident frequency indicates platform-level isolation gaps.
4. Compliance/regional constraints require architectural separation.
