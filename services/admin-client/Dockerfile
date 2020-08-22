FROM node:12.18.2

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start" ]