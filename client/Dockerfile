FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf.template
COPY nginx/start.sh /start.sh

RUN chmod +x /start.sh

RUN mkdir -p /usr/share/nginx/html/live/logs

RUN mkdir -p /etc/letsencrypt/live/${HOST}

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80 443

CMD ["/start.sh"]
