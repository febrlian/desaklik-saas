# Capacity Milestone Playbook (P0-09)

This runbook defines the explicit trigger metrics and subsequent actions to take as DesaKlik scales from 1,000 to 83,000 villages. **Do not execute these steps proactively.** Wait for the defined metrics to breach before adding architectural complexity.

## Milestone 1: 1k Villages
*   **Trigger Condition:** Steady, daily active usage reaching ~1,000 villages.
*   **Trigger Metrics:**
    *   API p95 latency frequently > 300ms.
    *   DB CPU utilization > 40% during peak hours.
*   **Required Actions:**
    1.  **Index Hygiene:** Run `pg_stat_statements` and identify top 5 slowest queries. Add covering composite indexes prioritizing `tenantId`.
    2.  **Worker Tuning:** Validate BullMQ retry delays and ensure DLQ is not accumulating unchecked errors.
*   **What NOT to do:** Do not add read replicas or split services. The modular monolith can easily handle 1k villages.

## Milestone 2: 10k Villages
*   **Trigger Condition:** Sustained load, likely driven by large bulk imports and heavy read pressure from analytics dashboards.
*   **Trigger Metrics:**
    *   DB read IOPS saturation.
    *   Async backlog trend (jobs taking > 5 minutes to begin processing).
*   **Required Actions:**
    1.  **Read Replica:** If DB reads are saturating the primary instance, provision a read replica. Route analytical queries (e.g., in the `AnalyticsModule`) to the replica.
    2.  **Partitioning Plan:** Identify the top 2 largest tables (likely `audit_log` or `notification_events`) and draft a PostgreSQL partitioning strategy (e.g., by month or `tenant_id` hash).

## Milestone 3: 30k Villages
*   **Trigger Condition:** Regional peaks overlapping.
*   **Trigger Metrics:**
    *   Peak-hour API latency p95 > 500ms consistently.
    *   Worker CPU saturation > 80%.
*   **Required Actions:**
    1.  **Execute Partitioning:** Apply the table partitioning drafted in Milestone 2.
    2.  **Worker Autoscaling:** Implement autoscaling rules for the background worker deployments based on Queue Depth metrics.
    3.  **Tighten SLO Alerts:** Adjust Prometheus/Grafana alerts to trigger faster during degradation.

## Milestone 4: 83k Villages (National Scale)
*   **Trigger Condition:** Full national rollout cadence.
*   **Trigger Metrics:**
    *   Single DB instance cannot horizontally scale compute effectively.
    *   A single module (e.g., `DocumentService`) consumes > 50% of monolith resources.
*   **Required Actions:**
    1.  **Multi-Replica Reads:** Scale read replicas horizontally behind a load balancer (e.g., PgBouncer).
    2.  **Formal DR Drills:** Execute `backup-restore-drill.md` weekly.
    3.  **Selective Extraction:** Use the `service-extraction-scorecard.md` to evaluate pulling the heaviest module into an independent service.
