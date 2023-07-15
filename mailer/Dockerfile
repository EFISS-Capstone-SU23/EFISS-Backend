FROM node

WORKDIR /efiss-backend/mailer

COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN npm install -g typescript

COPY src /efiss-backend/mailer/src
COPY proto /efiss-backend/mailer/proto
COPY tsconfig.json .
RUN tsc

EXPOSE 50055

CMD ["node", "dist/index.js"]