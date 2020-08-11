FROM nginx:1.17.9-alpine

COPY ./config/production.nginx /etc/nginx/conf.d/default.conf