# ADR-001: Modular Monolith First

- **Status**: Accepted
- **Date**: 2026-05-19

## Context

DesaKlik needs fast iteration, strong tenant isolation, and low operational overhead in early stages. Splitting into microservices immediately would increase release, observability, and incident complexity before demand patterns are stable.

## Decision

Adopt a **modular monolith** as the default architecture for Phase 0 and near-term execution:
- one deployable backend,
- explicit internal module boundaries,
- shared relational database with tenant conventions,
- async workers for heavy workloads.

## Consequences

### Positive
- Faster development and simpler local/staging environments.
- Easier end-to-end testing and rollback.
- Lower platform and operational burden.

### Trade-offs
- Requires discipline to maintain module boundaries.
- High-load modules may compete for resources until tuned.

### Mitigations
- Enforce module boundaries in code reviews.
- Use queue workers and performance budgets.
- Apply service extraction scorecard only when thresholds are met.

## Revisit Triggers

Revisit this ADR when at least two conditions persist for two review cycles:
1. A module consistently drives >30% platform load and impacts unrelated modules.
2. Independent scaling cannot be solved inside monolith patterns.
3. Deployment risk/frequency differs enough to justify operational split.
4. Team has demonstrated capacity to operate additional services safely.
