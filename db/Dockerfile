FROM nginx:mainline-alpine

EXPOSE 80

COPY custom.conf /etc/nginx/conf.d

COPY ./www /var/www

CMD ["nginx", "-g", "daemon off;"]