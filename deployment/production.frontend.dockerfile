FROM node:22-alpine AS build

WORKDIR /YellowBook/production/frontend

ADD development/frontend/package*.json /YellowBook/production/frontend

RUN yarn install

ADD development/frontend/ /YellowBook/production/frontend

RUN sed -i 's/IS_DEV = true/IS_DEV = false/' /YellowBook/production/frontend/src/utils/axiosInstance.js

RUN yarn build

FROM nginx:alpine

COPY deployment/nginx.config /etc/nginx/nginx.conf

COPY --from=build /YellowBook/production/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
