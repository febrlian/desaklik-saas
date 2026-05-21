#!/bin/bash
set -e

# Default values
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_USER=${DB_USER:-postgres}
DB_NAME=${DB_NAME:-desaklik}
BACKUP_DIR=${BACKUP_DIR:-"./backups"}

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Generate timestamp for the backup file
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_backup_${TIMESTAMP}.sql"

echo "Starting backup of database '$DB_NAME' to '$BACKUP_FILE'..."

# Execute pg_dump
# We use custom format (-Fc) which is compressed and optimal for pg_restore
# If PGPASSWORD is set in the environment, pg_dump will use it
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -Fc "$DB_NAME" -f "$BACKUP_FILE"

echo "Backup completed successfully: $BACKUP_FILE"
