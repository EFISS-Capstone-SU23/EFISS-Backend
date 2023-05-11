FROM node:slim

RUN apt-get update -q -y

WORKDIR /efiss-backend
COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN npm install -g pm2 typescript

EXPOSE 3000

COPY src /efiss-backend/src
COPY ecosystem.config.js .
COPY tsconfig.json .
RUN tsc

CMD ["pm2-runtime", "start", "ecosystem.config.js"]