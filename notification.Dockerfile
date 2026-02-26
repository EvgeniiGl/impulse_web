FROM phalconphp/cphalcon:v5.9.2-php8.4

# Switch to root user for package installation
USER root

# Install supervisor
RUN apt-get update && apt-get install -y \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Создаем все необходимые директории
RUN mkdir -p /var/log/supervisor /var/run/supervisor /var/log/notification

# Set working directory
WORKDIR /var/www

# Копируем скрипт воркера и даем права
COPY docker/notification/worker.sh /var/www/docker/notification/worker.sh
RUN chmod +x /var/www/docker/notification/worker.sh

# Копируем composer и устанавливаем зависимости (если нужно)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY composer.json composer.lock* ./
RUN if [ -f composer.json ]; then composer install --optimize-autoloader --no-dev; fi

# Копируем конфигурацию supervisor
COPY docker/notification/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Создаем лог-файлы и устанавливаем права
RUN touch /var/log/web_push.log && \
    chmod 666 /var/log/web_push.log && \
    chown -R www-data:www-data /var/log/notification /var/log/web_push.log

# Start supervisord
CMD ["/bin/bash", "/var/www/docker/notification/worker.sh"]