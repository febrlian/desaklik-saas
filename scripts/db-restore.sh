#!/bin/bash

DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_USER=${DB_USER:-postgres}
DB_NAME=${DB_NAME:-desaklik}

if [ -z "$1" ]; then
  echo "Error: Backup file path is required."
  echo "Usage: ./db-restore.sh path/to/backup_file.sql"
else
  BACKUP_FILE=$1

  if [ ! -f "$BACKUP_FILE" ]; then
    echo "Error: Backup file '$BACKUP_FILE' not found."
  else
    echo "Starting restoration of database '$DB_NAME' from '$BACKUP_FILE'..."
    echo "WARNING: This will overwrite data if executed."

    if [ "$FORCE_RESTORE" != "true" ]; then
      echo "Please set FORCE_RESTORE=true to bypass interactive prompt in CI environments."
    else
      pg_restore -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c --if-exists "$BACKUP_FILE"

      if [ $? -eq 0 ]; then
        echo "Database restoration completed successfully."
      else
        echo "Error occurred during restoration."
      fi
    fi
  fi
fi
