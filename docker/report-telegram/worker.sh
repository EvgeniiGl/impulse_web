#!/bin/bash

# Функция для логирования с timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting report-telegram worker with 30-second interval"
log "Current directory: $(pwd)"
log "PHP version: $(php -v | head -n1)"

# Проверка существования CLI скрипта
if [ ! -f /var/www/cli/cli.php ]; then
    log "ERROR: /var/www/cli/cli.php not found!"
    ls -la /var/www/cli/ 2>&1 | while read line; do log "  $line"; done
else
    log "CLI file found: $(ls -la /var/www/cli/cli.php)"
fi

while true; do
    log "Running reportTelegram send command"

    if [ -f /var/www/cli/cli.php ]; then
        OUTPUT=$(php /var/www/cli/cli.php reportTelegram send 2>&1)
        EXIT_CODE=$?

        echo "$OUTPUT" | while read line; do
            if [ ! -z "$line" ]; then
                log "CLI: $line"
            fi
        done

        if [ $EXIT_CODE -ne 0 ]; then
            log "ERROR: Command failed with exit code $EXIT_CODE"
        else
            log "Command completed successfully"
        fi
    else
        log "ERROR: CLI script not found, skipping"
    fi

    log "Waiting 30 seconds until next run"
    sleep 30
done
