FROM node

WORKDIR /efiss-backend/auth

COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN npm install -g typescript

COPY src /efiss-backend/auth/src
COPY proto /efiss-backend/auth/proto
COPY tsconfig.json .
RUN tsc

EXPOSE 3001

CMD ["node", "dist/index.js"]