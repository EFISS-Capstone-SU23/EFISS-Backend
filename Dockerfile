FROM node:slim

RUN apt-get update -q -y && \
    apt-get install -q -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /efiss-backend
COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN npm install -g pm2 typescript

EXPOSE 3000

COPY src /efiss-backend/src
COPY ecosystem.config.js .
COPY tsconfig.json .
RUN tsc

HEALTHCHECK --interval=30s --timeout=2m --start-period=45s \
   CMD curl -f --retry 6 --max-time 5 --retry-delay 10 --retry-max-time 60 "http://localhost:3000/health" || bash -c 'kill -s 15 -1 && (sleep 10; kill -s 9 -1)'

CMD ["pm2-runtime", "start", "ecosystem.config.js"]