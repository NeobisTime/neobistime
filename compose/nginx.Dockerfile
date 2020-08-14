FROM nginx:1.17.9-alpine

COPY ./config/production.ngiznx /etc/nginx/conf.d/default.conf