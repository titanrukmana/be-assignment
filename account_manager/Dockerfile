FROM node:22.1.0-alpine

WORKDIR /app

COPY package.json .

COPY tsconfig.json .

RUN NODE_ENV=development npm install

COPY ./ ./

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start"]