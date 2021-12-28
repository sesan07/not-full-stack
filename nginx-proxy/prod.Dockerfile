FROM nginx
 
COPY ./prod.nginx.conf /etc/nginx/nginx.conf
COPY ./ssl/ /etc/nginx/ssl/
