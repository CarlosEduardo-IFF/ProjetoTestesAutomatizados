FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm install -g dotenv-cli

RUN npx dotenv -e .env -- ts-node ./tests/tests.ts

FROM node:20-alpine AS runtime

WORKDIR /app

COPY --from=builder /app /app

RUN npm install -g ts-node nodemon tsconfig-paths

ENV NODE_ENV=production

CMD ["npm", "run", "start:dev"]
