FROM php:8.3.13-fpm

# Set working directory
WORKDIR /var/www

# Locales
RUN apt-get update \
    && apt-get install -y locales

# Common
RUN apt-get install -y \
        openssl \
        zip \
        libzip-dev \
        unzip \
        git \
    && docker-php-ext-install -j$(nproc) \
        zip

# XML
RUN apt-get install -y \
    libxml2-dev \
    && docker-php-ext-install -j$(nproc) \
        xml

# database
RUN apt-get install -y \
    libpq-dev \
    && docker-php-ext-install -j$(nproc) \
        pdo_pgsql \
        pgsql

# Install necessary development libraries for GD
RUN apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd

# strings
RUN apt-get install -y libonig-dev \
    && docker-php-ext-install -j$(nproc) \
        mbstring

# intl
RUN apt-get install -y \
        libicu-dev \
    && docker-php-ext-install -j$(nproc) \
        intl \
    && apt-get purge -y \
        libicu-dev

#apcu
RUN mkdir -p /usr/src/php/ext/apcu && curl -fsSL https://pecl.php.net/get/apcu | tar xvz -C "/usr/src/php/ext/apcu" --strip 1 && docker-php-ext-install apcu
#RUN pecl install apcu-5.1.22 \
#  && docker-php-ext-enable apcu

# opcache
RUN docker-php-ext-install -j$(nproc) \
        opcache

# Phalcon
ENV PHALCON_VERSION=5.8.0

RUN curl -sSL "https://codeload.github.com/phalcon/cphalcon/tar.gz/v${PHALCON_VERSION}" | tar -xz \
    && cd cphalcon-${PHALCON_VERSION}/build \
    && ./install \
    && cd ../../ \
    && rm -r cphalcon-${PHALCON_VERSION}

RUN echo "extension=phalcon.so" > /usr/local/etc/php/conf.d/phalcon.ini

RUN echo 'memory_limit = 1024M' >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini;
RUN echo 'upload_max_filesize  = 10240M' >> /usr/local/etc/php/conf.d/docker-php-upload.ini;
RUN echo 'post_max_size = 10240M' >> /usr/local/etc/php/conf.d/docker-php-post.ini;
RUN echo 'date.timezone = Europe/Moscow' >> /usr/local/etc/php/conf.d/docker-php-timezone.ini;

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Clean
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/*

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory contents
#COPY . /var/www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Change current user to www не можем включить из-за supervisord
#USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000

ENTRYPOINT ["php-fpm"]
