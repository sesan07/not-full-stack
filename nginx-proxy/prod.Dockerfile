FROM nginx
 
COPY ./prod.nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

RUN apt update