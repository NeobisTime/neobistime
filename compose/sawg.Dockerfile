FROM linuxserver/letsencrypt

COPY ./conf/swag/default.nginx /config/nginx/site-confs/default

COPY ./conf/swag/ssl.nginx /config/nginx/ssl.conf

COPY ./conf/swag/nginx_conf.nginx /config/nginx/nginx.conf
