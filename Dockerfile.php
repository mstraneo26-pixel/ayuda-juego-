# Dockerfile.php
# Contenedor Apache + PHP para servir la app y la API

FROM php:8.2-apache

# Habilitar módulos comunes si necesitas (rewrite, etc.)
RUN a2enmod rewrite

# Copiar el proyecto al document root
WORKDIR /var/www/html
COPY . /var/www/html

# Permisos básicos (opcional)
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

# Por defecto, apache-foreground arranca el servidor
