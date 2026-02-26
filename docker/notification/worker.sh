#!/bin/bash

# Функция для логирования с timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting notification worker with 60-second interval"
log "Current directory: $(pwd)"
log "PHP version: $(php -v | head -n1)"

# Проверка существования CLI скрипта
if [ ! -f /var/www/cli/cli.php ]; then
    log "ERROR: /var/www/cli/cli.php not found!"
    log "Contents of /var/www/cli:"
    ls -la /var/www/cli/ 2>&1 | while read line; do log "  $line"; done
else
    log "CLI file found: $(ls -la /var/www/cli/cli.php)"
fi

while true; do
    log "=" 50
    log "Running notification send command"

    if [ -f /var/www/cli/cli.php ]; then
        # Запускаем команду и захватываем вывод
        OUTPUT=$(php /var/www/cli/cli.php notification send 2>&1)
        EXIT_CODE=$?

        # Логируем вывод построчно
        echo "$OUTPUT" | while read line; do
            if [ ! -z "$line" ]; then
                log "CLI OUTPUT: $line"
            fi
        done

        if [ $EXIT_CODE -ne 0 ]; then
            log "ERROR: Command failed with exit code $EXIT_CODE"

            # Дополнительная диагностика при ошибке
            log "Testing database connection..."
            php -r "
            \$dbHost = getenv('DB_HOST') ?: 'postgres';
            \$dbPort = getenv('DB_PORT') ?: '5432';
            \$dbName = getenv('DB_NAME') ?: '';
            \$dbUser = getenv('DB_USER') ?: '';
            \$dbPass = getenv('DB_PASSWORD') ?: '';

            try {
                \$pdo = new PDO(\"pgsql:host=\$dbHost;port=\$dbPort;dbname=\$dbName\", \$dbUser, \$dbPass);
                echo \"Database connection: SUCCESS\\n\";
            } catch (PDOException \$e) {
                echo \"Database connection: FAILED - \" . \$e->getMessage() . \"\\n\";
            }" 2>&1 | while read line; do log "DB CHECK: $line"; done
        else
            log "Command completed successfully"
        fi
    else
        log "ERROR: CLI script not found, skipping command execution"
    fi

    log "Waiting 60 seconds until next run"
    log "-" 50
    sleep 60
done