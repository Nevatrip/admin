FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install -g @sanity/cli
COPY . .
RUN sanity install

EXPOSE 8000
CMD [ "sanity", "start", "--port=8000", "--host=0.0.0.0" ]
