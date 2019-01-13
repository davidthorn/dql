FROM node:latest

ARG _port
ARG _host
ARG _api_key
ARG _firebase_host

WORKDIR /app

COPY ./endpoints /app/endpoints
COPY ./src /app/src

COPY ./package.json /app
COPY ./tsconfig.json /app
COPY ./server.ts /app

RUN npm install

ENV API_KEY=$_api_key

ENV HOST=$_host
ENV PORT=$_port
ENV FIREBASE_HOST=$_firebase_host
ENV FIREBASE_PORT=$_firebase_port

EXPOSE $_port

VOLUME [ "/app" ]

CMD ["npm" , "run" , "serve:mock"] 