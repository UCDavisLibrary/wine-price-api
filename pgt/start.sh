#!/bin/bash

export PGT_ANON=${PGT_ANON:-anon}
export PGT_JWT=${PGT_JWT:-bad_secret}

# Wait for PG to come-online
wait-for-it -t 5 postgres:5432 -- echo 'postgres is hot'

# First Initialize postgrest
envsubst < /etc/pgt_envsubst.conf > /etc/postgrest.conf
postgrest /etc/postgrest.conf &

# Next Setup NGINX
envsubst < /etc/nginx_envsubst.conf > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
