# Incident Runbook: High API Latency or Error Rates

## 1. Overview
This runbook covers initial triage and response when performance budgets are breached, as monitored via the Prometheus metrics (`http_request_duration_seconds` and `http_requests_total`).

## 2. Triggering Alerts
* **High API Latency (p95 > 500ms or 800ms for search)**
* **High Error Rate (> 1% over 5m)**

## 3. Initial Assessment (Triage)
1. Check the Grafana dashboard for specific affected modules (`route` and `method` labels).
2. Look for correlated spikes in Database CPU/IO or Queue delay metrics.
3. Check application logs (filtered by error level and the affected module) via centralized logging. Use `x-request-id` to trace specific failed requests.

## 4. Mitigation Steps

### Database Pressure
If DB load is high and read queries are failing/slow:
* Review the active queries. Are there missing indexes?
* Consider scaling up the DB instance or enabling the configured read-replica if traffic sustains.

### Worker Saturation
If the queue is backed up causing API endpoints waiting on synchronous or pseudo-synchronous tasks to timeout:
* Check worker concurrency settings in BullMQ config.
* Scale up the worker deployment.

### Service Failures (5xx)
* Check the logs for specific stack traces.
* If related to a specific bad deployment, initiate a rollback.
* If related to an external service (e.g. notifications), ensure failures are routed to the DLQ gracefully and the circuit breaker is active.

## 5. Escalation
If mitigation cannot be applied within 15 minutes, escalate to the Engineering Lead on call. Provide them with:
* Failing routes/modules.
* Example `tenant_id` and `request_id` from the logs.
