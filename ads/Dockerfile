FROM node

WORKDIR /efiss-backend/advertising

COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN npm install -g typescript

COPY src /efiss-backend/advertising/src
COPY tsconfig.json .
RUN tsc

EXPOSE 3005

CMD ["node", "dist/index.js"]