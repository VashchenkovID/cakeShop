FROM node:alpine

WORKDIR /server
COPY . .

RUN rm -rf /server/node_modules
RUN rm -rf /server/package-lock.json

RUN npm install
# Starting our application
CMD npm start
