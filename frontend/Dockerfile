FROM node:18-alpine AS build

WORKDIR /usr/app

COPY package.json yarn.lock ./

# inject all environment vars we'll need
ARG GOOGLE_API_KEY
# expose the variable to the finished cotainer
ENV VITE_GOOGLE_API_KEY=$GOOGLE_API_KEY

COPY . .

RUN yarn
RUN yarn build

FROM nginx:stable-alpine

WORKDIR /usr/app

COPY --from=build /usr/app/nginx /etc/nginx/conf.d
COPY --from=build /usr/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]