# Incident Runbook: Backup & Restore Drill (P0-08)

## 1. Overview
This document outlines the procedure to perform a disaster recovery drill, restoring a production or staging database dump to a clean environment, and verifying its integrity.

## 2. Recovery Objectives
- **Recovery Point Objective (RPO):** Maximum 24 hours of data loss (daily backups).
- **Recovery Time Objective (RTO):** Maximum 4 hours to full restoration and application boot.

## 3. Preparation Steps
1. Identify the latest automated backup or manually trigger one using `pnpm run db:backup`.
2. Provision a clean PostgreSQL instance (local docker or dedicated staging instance).
3. Set the required environment variables:
   ```bash
   export DB_HOST=localhost
   export DB_PORT=5432
   export DB_USER=postgres
   export DB_NAME=desaklik_restore_test
   export FORCE_RESTORE=true
   ```

## 4. Execution Steps
1. Run the restoration script against the clean database instance:
   ```bash
   ./scripts/db-restore.sh path/to/backup_file.sql
   ```
2. Monitor the output for any critical schema or data import errors.

## 5. Integrity Verification Checklist
After the restore completes, perform the following queries against the restored DB and verify they match the source metrics:

- [ ] `SELECT COUNT(*) FROM tenants;` - Total active tenants match.
- [ ] `SELECT COUNT(*) FROM users;` - Total user records match.
- [ ] `SELECT COUNT(*) FROM village_profiles;` - Total village profiles match.
- [ ] Login via the web UI pointing to the restored database using a known test credential.
- [ ] Generate a test document to ensure the worker queue can read/write successfully to the restored state.

## 6. Drill Log (Evidence)

| Date | Performed By | Environment | Time to Restore (RTO) | Data Age (RPO) | Notes / Observations |
| :--- | :--- | :--- | :--- | :--- | :--- |
| YYYY-MM-DD | Jane Doe | Staging | 15 mins | 2 hours | Successful drill. `pg_restore` handled all composite indices gracefully. |
