FROM node:18-alpine as build
WORKDIR /cabinet-administration
COPY . /cabinet-administration
ENV PATH /cabinet-administration/node_modules/.bin:$PATH
RUN npm install
CMD npm run build


