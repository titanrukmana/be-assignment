FROM node:22.1.0-alpine AS builder

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build
RUN chmod +x ./entry.sh


FROM node:22.1.0-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/entry.sh ./entry.sh

EXPOSE 8000

ENTRYPOINT [ "./entry.sh" ]

CMD ["node", "build/src/main.js"]