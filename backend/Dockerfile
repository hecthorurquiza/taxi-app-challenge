FROM node:18-alpine AS build

WORKDIR /usr/app

COPY package.json yarn.lock ./

COPY . .

RUN yarn 

FROM node:18-alpine3.19

WORKDIR /usr/app

# inject all environment vars we'll need
ARG GOOGLE_API_KEY
# expose the variable to the finished cotainer
ENV GOOGLE_API_KEY=$GOOGLE_API_KEY
ENV DATABASE_URL=postgresql://admin:admin@shopper@taxi-app-db:5432/taxiappdb?schema=public

COPY --from=build /usr/app/package.json ./package.json
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/src ./src
COPY --from=build /usr/app/tsconfig.json ./tsconfig.json
COPY --from=build /usr/app/prisma ./prisma

EXPOSE 8080

RUN npx prisma generate

CMD [ "yarn", "start" ]
