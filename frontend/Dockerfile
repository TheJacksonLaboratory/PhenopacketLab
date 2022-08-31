#stage 1
FROM node:14 as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm run build --dev

#stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/frontend /usr/share/nginx/html

