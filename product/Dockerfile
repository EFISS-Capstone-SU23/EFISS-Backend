FROM node:slim

WORKDIR /efiss-backend/product

COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN npm install -g typescript pm2

COPY src /efiss-backend/product/src
COPY proto /efiss-backend/product/proto
COPY tsconfig.json .
RUN tsc

EXPOSE 50051 3002

CMD ["pm2-runtime", "dist/main.js"]