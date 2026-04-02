FROM phalconphp/cphalcon:v5.9.2-php8.4

# Switch to root user for package installation
USER root

# Switch Debian repositories to HTTPS and update
RUN sed -i 's|http://deb.debian.org|https://deb.debian.org|g' /etc/apt/sources.list.d/debian.sources \
    && apt-get update

# Install dependencies
RUN apt-get install -y \
    supervisor \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Создаём необходимые директории
RUN mkdir -p /var/log/supervisor /var/run/supervisor /var/log

# Set working directory
WORKDIR /var/www

# Копируем composer и устанавливаем зависимости
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY composer.json composer.lock* ./
RUN if [ -f composer.json ]; then composer install --optimize-autoloader --no-dev; fi

# Копируем скрипт воркера и даём права
COPY docker/report-telegram/worker.sh /var/www/docker/report-telegram/worker.sh
RUN chmod +x /var/www/docker/report-telegram/worker.sh

# Копируем конфигурацию supervisor
COPY docker/report-telegram/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Создаём лог-файл
RUN touch /var/log/report_telegram.log && \
    chmod 666 /var/log/report_telegram.log

CMD ["/bin/bash", "/var/www/docker/report-telegram/worker.sh"]
