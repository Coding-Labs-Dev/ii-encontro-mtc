FROM node:12.18.2

WORKDIR /usr/src/app

RUN git init

COPY . ./

RUN yarn


EXPOSE 8080

CMD [ "yarn", "dev" ]