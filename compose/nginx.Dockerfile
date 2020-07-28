FROM nginx:1.17.9-alpine

COPY ./conf/production.nginx /etc/nginx/conf.d/default.conf