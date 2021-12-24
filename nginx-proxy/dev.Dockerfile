FROM nginx
 
COPY ./dev.nginx.conf /etc/nginx/nginx.conf
COPY ./ssl/ /etc/nginx/ssl/