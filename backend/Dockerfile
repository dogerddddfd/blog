FROM node:latest
WORKDIR /home/WORKDIR/
COPY package.json /home/WORKDIR/
# RUN npm config set registry https://npm.aliyun.com \
#    && npm install 
RUN npm install --loglevel info

COPY . /home/WORKDIR/

ENV ENV_FILE=/home/WORKDIR/.env

CMD ["npm","run","start"]