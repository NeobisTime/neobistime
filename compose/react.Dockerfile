FROM node:13-alpine as builder
WORKDIR /usr/src/app

COPY front-end/package.json /usr/src/app/package.json

RUN npm install

COPY front-end/ .

RUN npm run build

FROM nginx:1.17.9-alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

COPY ./conf/nginx/front-end.nginx /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]