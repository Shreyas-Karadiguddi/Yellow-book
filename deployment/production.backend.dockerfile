FROM node:22-alpine

WORKDIR /YellowBook/production/backend

ADD development/backend/package.json /YellowBook/production/backend

RUN yarn install

ADD development/backend/ /YellowBook/production/backend

EXPOSE 8085

CMD ["yarn", "start"]