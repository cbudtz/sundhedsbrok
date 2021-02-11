FROM node:14-alpine

WORKDIR /buildpath

COPY ./web/package.json ./
COPY ./web/yarn.lock ./

RUN yarn install

COPY ./web/ .
ENV NEXT_PUBLIC_API_URL=https://sundhedsbrokapi.4a4b.dk/
RUN NEXT_PUBLIC_API_URL=https://sundhedsbrokapi.4a4b.dk/ && yarn build

EXPOSE 3000

CMD ["yarn", "start"]