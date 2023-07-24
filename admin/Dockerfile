FROM node:slim

WORKDIR /efiss-backend/admin

COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN npm install -g typescript pm2

COPY src /efiss-backend/admin/src
COPY proto /efiss-backend/admin/proto
COPY tsconfig.json .
RUN tsc

EXPOSE 3006

CMD ["pm2-runtime", "dist/main.js"]