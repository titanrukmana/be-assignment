FROM node

WORKDIR /app

COPY package.json /app

ENV NODE_ENV=production

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 8000

RUN npx prisma generate

CMD ["node", "build/src/main.js"]