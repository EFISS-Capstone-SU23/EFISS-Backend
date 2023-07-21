FROM node:slim

WORKDIR /efiss-backend/search

COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN npm install -g typescript pm2

COPY src /efiss-backend/search/src
COPY tsconfig.json .
RUN tsc

EXPOSE 3003

CMD ["pm2-runtime", "dist/main.js"]