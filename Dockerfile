FROM node:slim

RUN apt-get update -q -y

WORKDIR /efiss-backend
COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN npm install -g pm2

EXPOSE 3000

COPY . .

CMD ["pm2-runtime", "start", "ecosystem.config.js"]