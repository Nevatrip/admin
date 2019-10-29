FROM node:10-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN mkdir -p /home/node/app/node_modules && \
    chown -R node:node /home/node/app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node/app

USER node

COPY --chown=node:node . .

ARG PROJECT_NAME
ARG PROJECT_ID
ARG PROJECT_DATASET

ENV PROJECT_NAME $PROJECT_NAME
ENV PROJECT_ID $PROJECT_ID
ENV PROJECT_DATASET $PROJECT_DATASET

RUN sed -i -e 's/$NAME/'$PROJECT_NAME'/g' \
           -e 's/$PROJECT/'$PROJECT_ID'/g' \
           -e 's/$DATASET/'$PROJECT_DATASET'/g' sanity.json

RUN npm install -g @sanity/cli pm2
RUN npm install

EXPOSE 3333

CMD [ "pm2-runtime", "ecosystem.config.js" ]
