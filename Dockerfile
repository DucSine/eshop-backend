FROM node:dubnium AS dist

ARG SERVICE_NAME
ENV SERVICE_NAME=$SERVICE_NAME
RUN echo "SERVICE_NAME = ${SERVICE_NAME}"

COPY package.json yarn.lock ./

RUN yarn install

COPY .env ./
COPY prisma ./

RUN yarn prisma generate

COPY . ./
RUN yarn "build:${SERVICE_NAME}"

FROM node:dubnium AS node_modules
COPY package.json yarn.lock ./

RUN yarn install --prod
COPY .env ./
COPY prisma ./

RUN yarn prisma generate
FROM node:dubnium

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules

COPY prisma /usr/src/app
COPY . /usr/src/app

ARG SERVICE_NAME
ENV SERVICE_NAME=$SERVICE_NAME
RUN echo "SERVICE_NAME = ${SERVICE_NAME}"

CMD yarn "start:${SERVICE_NAME}"
