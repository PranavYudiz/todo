FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/*.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]