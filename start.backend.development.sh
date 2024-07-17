#!/bin/bash

# 启动postgres
docker compose --file docker-compose.development.yml up -d

# 启动backend
cd ./backend
export ENV_FILE=../.env.development
echo ENV_FILE:${ENV_FILE}

npm run start:dev
