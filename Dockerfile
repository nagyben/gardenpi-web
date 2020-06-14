# Stage 0, "build-stage", based on Node.js, to build and compile Angular
FROM node as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

# RUN npm run test -- --browsers ChromeHeadlessNoSandbox --watch=false

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

COPY ./nginx.gardenpi.conf /etc/nginx/conf.d/default.conf