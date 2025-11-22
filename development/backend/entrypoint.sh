#!/bin/bash

set -o allexport
source ../.env
set +o allexport

while ! mysqladmin ping -h "127.0.0.1" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" --silent; do
    echo "Waiting for DB on port $MYSQL_PORT..."
    sleep 2
done

echo "Database is connected..."

node ./patches/patches.js

code .

echo "Starting dev server..."
nodemon server.js
