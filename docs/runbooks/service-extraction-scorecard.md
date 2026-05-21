# Service Extraction Scorecard (P0-10)

Extracting a module from the Modular Monolith into a standalone microservice introduces significant operational overhead (networking, distributed tracing, independent CI/CD, isolated databases).

We **only** extract a service if it meets the criteria below.

## Evaluation Criteria

Evaluate the target module against these criteria. **A module must score "Yes" on at least 2 criteria for 2 consecutive review cycles (e.g., 2 months)** to be considered for extraction.

| ID | Criterion | Description | Threshold Measurement | Met? (Y/N) |
| :--- | :--- | :--- | :--- | :--- |
| **C1** | **Resource Dominance** | The module consumes a disproportionate amount of system resources, causing noisy-neighbor degradation to other modules. | Module accounts for >30% of total CPU/Memory/DB Load. | [ ] |
| **C2** | **Scaling Friction** | The module needs to scale horizontally at a vastly different rate than the rest of the monolith, and async workers cannot solve it. | Async offloading has been exhausted, but synchronous bottleneck persists. | [ ] |
| **C3** | **Deployment Velocity Friction** | The module requires deployments (e.g., multiple times a day) that conflict with the risk profile of the rest of the monolith. | Module PRs are delayed >24h by monolithic CI/CD queues consistently. | [ ] |
| **C4** | **Domain Isolation** | The module has a strictly defined Bounded Context with near-zero synchronous coupling to other domains. | >90% of cross-module interaction is asynchronous (events). | [ ] |

## Decision Template

**Target Module:** `[Module Name, e.g., DocumentService]`
**Review Date:** `YYYY-MM-DD`
**Reviewer:** `[Name]`

**Scores:**
- C1: [ ]
- C2: [ ]
- C3: [ ]
- C4: [ ]

**Total Score:** `[X]/4`

**Decision:**
*   [ ] **Keep in Monolith:** Optimize queries, add caching, or push more work to async queues.
*   [ ] **Monitor:** Criteria met, but needs to be sustained for another review cycle.
*   [ ] **Extract:** Criteria met for 2+ cycles. Begin drafting Extraction RFC.

## Review Cadence
This scorecard should be reviewed **Quarterly** or immediately upon breaching the 30k village capacity milestone.
