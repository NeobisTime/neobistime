FROM nginx:1.17.9-alpine

COPY /client/build/ /usr/share/nginx/html

EXPOSE 80

COPY ./config/front-end.nginx /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
