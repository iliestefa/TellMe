#!/bin/bash

# Configurar la variable de entorno
export HOST=tellme.iliestefa.com

# Instalar Certbot y sus dependencias
sudo amazon-linux-extras install epel -y
sudo yum install -y certbot python3-certbot-nginx

# Crear directorio para certificados
sudo mkdir -p /etc/letsencrypt/live/${HOST}

# Configurar el certificado SSL
sudo certbot --nginx -d ${HOST} --non-interactive --agree-tos --email developer@iliestefa.com

# Reiniciar Nginx
sudo systemctl restart nginx

sudo certbot certificates

echo "HOST=${HOST}" >> .env

cd TellMe
sudo docker-compose down
sudo docker-compose up -d 