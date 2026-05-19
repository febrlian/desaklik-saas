# Documentation Source of Truth

This directory is the canonical source for architecture and execution decisions.

## Structure

- `phase-0/spec.md` — what Phase 0 includes and excludes
- `phase-0/architecture-modular-monolith.md` — target architecture for now
- `phase-0/implementation-plan.md` — step-by-step delivery plan
- `phase-0/actionable-tasks.md` — dependency-ordered work chunks
- `phase-0/guardrails.md` — anti-overengineering constraints
- `adr/` — immutable architectural decisions and revisit triggers

## Reading Order

1. [Phase 0 Spec](./phase-0/spec.md)
2. [Architecture: Modular Monolith First](./phase-0/architecture-modular-monolith.md)
3. [Guardrails](./phase-0/guardrails.md)
4. [Implementation Plan](./phase-0/implementation-plan.md)
5. [Actionable Tasks](./phase-0/actionable-tasks.md)
6. [ADRs](./adr/)

## Rules

- Prefer practical defaults over platform complexity.
- Add scope only with clear user value and an owner.
- Any major change requires an ADR update.

## Dedicated Scale-Readiness Section

See: [83,000 Village Scale Readiness (without premature microservices)](./phase-0/architecture-modular-monolith.md#83000-village-scale-readiness-without-premature-microservices)
