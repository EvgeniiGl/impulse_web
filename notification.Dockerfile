FROM phalconphp/cphalcon:v5.9.2-php8.4

# Switch to root user for package installation
USER root

# Install supervisor
RUN apt-get update && apt-get install -y \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Create supervisor log directory
RUN mkdir -p /var/log/supervisor

# Copy supervisor configuration
COPY docker/notification/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set working directory
WORKDIR /var/www

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy composer files (если нужно)
COPY composer.json composer.lock* ./

# Install PHP dependencies (если нужно)
RUN composer install --optimize-autoloader

# Copy existing application directory contents (раскомментируйте если нужно)
# COPY . /var/www

# Create log file and set permissions
RUN touch /var/log/web_push.log && \
    chmod 666 /var/log/web_push.log

# Expose port if needed (обычно не требуется для воркера)
# EXPOSE 9000

# Start supervisord
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]