FROM node:20-slim

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* .npmrc ./

RUN pnpm install

COPY . .

CMD ["pnpm", "run", "dev"]