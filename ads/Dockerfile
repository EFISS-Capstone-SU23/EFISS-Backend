FROM node:slim

WORKDIR /efiss-backend/ads

COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN npm install -g typescript pm2

COPY src /efiss-backend/ads/src
COPY proto /efiss-backend/ads/proto
COPY tsconfig.json .
RUN tsc

EXPOSE 3005

CMD ["pm2-runtime", "dist/main.js"]