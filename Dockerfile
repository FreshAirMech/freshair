FROM node:8-onbuild
MAINTAINER Jonathan Rim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package.json /usr/src/app/
RUN npm install --production

COPY . /usr/src/app
RUN cd /usr/src/app

EXPOSE 3000

CMD npm run prod-start