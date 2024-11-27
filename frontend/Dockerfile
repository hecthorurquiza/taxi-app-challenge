FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# inject all environment vars we'll need
ARG GOOGLE_API_KEY
# expose the variable to the finished cotainer
ENV VITE_GOOGLE_API_KEY=$GOOGLE_API_KEY

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:stable-alpine

# copy nginx configuration in side conf.d folder
COPY --from=build /app/nginx /etc/nginx/conf.d

# Copy the build output from the dist folder into the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]