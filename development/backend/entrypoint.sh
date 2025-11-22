#!/bin/bash

set -o allexport
source ../../.env
set +o allexport

while ! mysqladmin ping -h "127.0.0.1" -P "$DBPORT" -u "$DBUSERNAME" -p"$DBPASSWORD" --silent; do
    echo "Waiting for DB on port $DBPORT..."
    sleep 2
done

echo "Database is connected..."

node ./patches/patches.js

code .

echo "Starting dev server..."
nodemon server.js
