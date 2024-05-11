FROM node:22.1.0-alpine AS builder

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build


FROM node:22.1.0-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 8000

CMD ["node", "build/src/main.js"]
