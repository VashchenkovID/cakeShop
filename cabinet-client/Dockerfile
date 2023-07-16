FROM node:18-alpine as build
WORKDIR /client
COPY . /client
ENV PATH /app/node_modules/.bin:$PATH
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY --from=build /client/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
