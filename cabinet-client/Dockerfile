FROM node:18-alpine as build
WORKDIR /cabinet-client
COPY . /cabinet-client
ENV PATH /cabinet-client/node_modules/.bin:$PATH
RUN npm install
CMD npm run build


