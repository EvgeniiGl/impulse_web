FROM phalconphp/cphalcon:v5.9.2-php8.4

# Switch to root user for package installation
USER root

# Set working directory
WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy composer files
COPY composer.json composer.lock* ./

# Install PHP dependencies
RUN composer install --optimize-autoloader

# Copy PHP JIT configuration
#COPY php-jit.ini /usr/local/etc/php/conf.d/99-jit.ini


RUN adduser www
RUN usermod -a -G 1000 www

# Copy existing application directory contents
#COPY . /var/www

# Copy existing application directory permissions
RUN chown -R www:www /var/www

# Expose port 9000 and start php-fpm server
EXPOSE 9000

ENTRYPOINT ["php-fpm"]
