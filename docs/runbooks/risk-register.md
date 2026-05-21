# National Onboarding Risk Register (P0-11)

This document tracks the highest severity operational risks as DesaKlik scales towards 83,000 villages.

## Review Cadence
Monthly review by Engineering Managers and Tech Leads.

## Risk Matrix

| Risk ID | Risk Description | Owner | Leading Signal (How do we know it's happening?) | Primary Mitigation | Fallback Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **R01** | **Tenant Data Leakage** <br> Shared-schema pattern fails, exposing data across village boundaries. | Backend Lead | Cross-tenant query alerts; Security audit findings. | Mandatory `CurrentTenant` middleware & repository guards. | Enable strict Row-Level Security (RLS) in PostgreSQL. |
| **R02** | **DB Saturation** <br> Rapid onboarding causes massive write locks or read latency. | Data Lead | DB CPU > 70%; `http_request_duration_seconds` (p95) > 1s. | Optimize indices; restrict heavy reporting queries to off-peak hours. | Provision Read Replica; Implement Table Partitioning. |
| **R03** | **Queue Overload** <br> Bulk imports block critical transactional notifications. | Platform Lead | BullMQ Queue Delay > 5 minutes. | Separate queue instances/priorities for Notifications vs. Imports. | Autoscale worker nodes based on queue depth. |
| **R04** | **Incident Response Lag** <br> MTTR increases due to lack of observability or context. | Ops Lead | Time to acknowledge alert > 15m. | Implement structured Pino logging and Prom metrics (P0-06). | Define strict PagerDuty rotations and escalate directly to leads. |
| **R05** | **Cost Spikes** <br> Infrastructure costs outpace budget during rapid scaling. | Eng Manager | Monthly AWS/GCP bill increases > 20% MoM without traffic correlation. | Right-size compute; enforce log retention budgets. | Implement hard rate limits on heavy API endpoints. |

## Checklist Before Major Onboarding Wave (e.g., +10k villages)
- [ ] Restore drill completed successfully in the last quarter (P0-08).
- [ ] Performance budgets (`test:perf`) passing in CI (P0-07).
- [ ] Queue DLQ is clear or acknowledged.
- [ ] Top 5 slow database queries optimized.
- [ ] On-call rotation and escalation paths confirmed.
