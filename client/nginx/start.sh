#!/bin/sh
export HOST=tellme.iliestefa.com
envsubst '${HOST}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
