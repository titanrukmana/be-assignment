FROM node:22.1.0-alpine

WORKDIR /app

COPY package.json .

COPY tsconfig.json .

RUN NODE_ENV=development npm install

COPY ./ ./

RUN npm run build

RUN npx prisma generate

EXPOSE 8000

CMD ["npm", "start"]