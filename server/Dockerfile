# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Setting up the work directory
WORKDIR /server

# Installing dependencies
COPY ./package.json /server
RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD npm start
