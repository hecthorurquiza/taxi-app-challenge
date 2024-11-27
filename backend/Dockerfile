FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY ./prisma ./prisma

# inject all environment vars we'll need
ARG GOOGLE_API_KEY
# expose the variable to the finished cotainer
ENV GOOGLE_API_KEY=$GOOGLE_API_KEY
ENV DATABASE_URL=postgresql://admin:admin@shopper@taxi-app-db:5432/taxiappdb?schema=public

RUN npm install

COPY . /app

EXPOSE 8080

RUN npx prisma generate

CMD [ "npm", "start" ]
