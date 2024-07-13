#!/bin/bash

# 启动postgres
docker compose --file docker-compose.local.yml up -d

# 启动backend
cd ./backend
export ENV_FILE=../.env.local
echo ENV_FILE:${ENV_FILE}

npm run start:dev