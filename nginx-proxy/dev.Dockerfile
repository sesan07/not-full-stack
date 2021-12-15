FROM nginx
 
COPY ./dev.nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

RUN apt update