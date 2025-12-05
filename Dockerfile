FROM phalconphp/swoole:8.3-cli-alpine

RUN apk add --no-cache \
    postgresql-dev

# Install PDO and PDO PostgreSQL extensions
RUN docker-php-ext-install pdo pdo_pgsql

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first for better caching
COPY composer.json composer.lock* ./

# Install dependencies if composer.json exists
# RUN if [ -f composer.json ]; then composer install --no-scripts --no-autoloader --no-dev; fi

# Copy application files
COPY . .

# Generate autoloader
# RUN if [ -f composer.json ]; then composer dump-autoload --optimize; fi

# Expose port for Swoole server
EXPOSE 9501

# Default command
CMD ["php", "-v"]
