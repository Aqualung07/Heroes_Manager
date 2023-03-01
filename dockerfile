FROM node:18.14.2-alpine3.16 AS build

    WORKDIR /usr/src/app
    COPY package.json package-lock.json ./
    RUN npm install
    COPY . .
    RUN npm run build

FROM nginx:1.22.1-alpine AS serve

    COPY nginx.conf /etc/nginx/nginx.conf
    COPY --from=build /usr/src/app/dist/heroes-manager /usr/share/nginx/html