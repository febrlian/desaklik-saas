# ADR-003: Go/Rust Adoption Criteria

- **Status**: Accepted
- **Date**: 2026-05-19

## Context

Go or Rust may improve performance or runtime efficiency for specific hotspots. However, introducing additional languages too early increases hiring, tooling, CI/CD, and on-call complexity.

## Decision

Primary implementation remains in the current main stack during Phase 0.

Adopt Go or Rust only for narrowly scoped components when **all** criteria are met:
1. Measured bottleneck cannot be solved by query tuning, caching, batching, or async worker redesign.
2. Target component is isolated behind a clear interface.
3. Expected improvement is quantified and materially meaningful.
4. Team has ownership for build, deploy, observability, and on-call support.
5. Rollback path to the main-stack implementation is defined.

## Consequences

### Positive
- Prevents unnecessary multi-language complexity.
- Keeps focus on product and tenant-safe execution.
- Encourages measurable performance engineering first.

### Trade-offs
- May delay potential optimization in edge cases.
- Requires careful profiling discipline before language changes.

### Mitigations
- Maintain a lightweight profiling and performance review cadence.
- Use service extraction scorecard before introducing new runtime boundaries.
- Pilot with one contained component before wider adoption.

## Revisit Triggers

Revisit when:
1. Same hotspot repeatedly breaches SLOs despite architectural and query optimizations.
2. Cost/performance analysis shows clear sustained benefit from Go/Rust.
3. Team capacity for safe multi-language operations is demonstrated.
