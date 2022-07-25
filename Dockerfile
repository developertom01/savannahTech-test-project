FROM node:16-alpine as app

ENV REACT_APP_ENV=production

WORKDIR /usr/opt/app

COPY ./package.json .
RUN yarn install

COPY . .
RUN yarn make:all
RUN yarn build
RUN cp -r ./build /build
WORKDIR /build
RUN rm -rf /usr/opt/app

FROM nginx:alpine
COPY ./devops/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/build
COPY --from=app /build .
EXPOSE 8080