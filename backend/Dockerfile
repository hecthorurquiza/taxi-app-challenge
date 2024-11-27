FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY ./prisma ./prisma

RUN npm install

COPY . /app

EXPOSE 8080

RUN npx prisma generate

CMD [ "npm", "start" ]
