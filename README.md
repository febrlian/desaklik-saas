# desaklik-saas

DesaKlik is in **Phase 0 (documentation reconstruction)**.

This repository is now **docs-first**: implementation must follow the documentation below, not ad-hoc infra or framework preferences.

## Canonical Reading Order (Source of Truth)

1. [`docs/README.md`](docs/README.md) — documentation map and ownership
2. [`docs/phase-0/spec.md`](docs/phase-0/spec.md) — Phase 0 scope, outcomes, and non-goals
3. [`docs/phase-0/architecture-modular-monolith.md`](docs/phase-0/architecture-modular-monolith.md) — baseline architecture
4. [`docs/phase-0/guardrails.md`](docs/phase-0/guardrails.md) — anti-overengineering rules
5. [`docs/phase-0/implementation-plan.md`](docs/phase-0/implementation-plan.md) — execution sequence
6. [`docs/phase-0/actionable-tasks.md`](docs/phase-0/actionable-tasks.md) — dependency-ordered tasks (0.5–2 day chunks)
7. ADRs:
   - [`docs/adr/ADR-001-modular-monolith-first.md`](docs/adr/ADR-001-modular-monolith-first.md)
   - [`docs/adr/ADR-002-infra-simplicity-first.md`](docs/adr/ADR-002-infra-simplicity-first.md)
   - [`docs/adr/ADR-003-go-rust-adoption-criteria.md`](docs/adr/ADR-003-go-rust-adoption-criteria.md)
8. [`tasks.md`](tasks.md) — execution tracker aligned to Phase 0 docs

## Required Scale-Readiness Section

The dedicated section **“83,000 Village Scale Readiness (without premature microservices)”** is documented here:
- Primary: [`docs/phase-0/architecture-modular-monolith.md#83000-village-scale-readiness-without-premature-microservices`](docs/phase-0/architecture-modular-monolith.md#83000-village-scale-readiness-without-premature-microservices)
- Execution view: [`docs/phase-0/implementation-plan.md#83000-village-scale-readiness-without-premature-microservices`](docs/phase-0/implementation-plan.md#83000-village-scale-readiness-without-premature-microservices)

## Working Principle

If code or infrastructure disagrees with these docs, update docs first (via ADR when needed), then update code.
