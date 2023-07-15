FROM node

WORKDIR /efiss-backend/normal-user

COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN npm install -g typescript

COPY src /efiss-backend/normal-user/src
COPY proto /efiss-backend/normal-user/proto
COPY tsconfig.json .
RUN tsc

EXPOSE 3004

CMD ["node", "dist/index.js"]