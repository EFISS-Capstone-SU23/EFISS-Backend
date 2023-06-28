FROM node

WORKDIR /efiss-backend/search

COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN npm install -g typescript

COPY src /efiss-backend/search/src
COPY tsconfig.json .
RUN tsc

EXPOSE 3003

CMD ["node", "dist/index.js"]