FROM node:14 as build

# Set the working directory
WORKDIR /usr/local/app

COPY ./ /usr/local/app

# Install all the dependencies
RUN npm install -g @angular/cli
RUN npm install --save-dev @angular-devkit/build-angular
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN ng build --configuration=production

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/phenopacketlab-frontend /srv/site
COPY --from=build /usr/local/app/site.conf /etc/nginx/conf.d/

# Expose port 4200 which we will map to 80 in Kubernetes
EXPOSE 4200

# FROM node:14 as build
# WORKDIR /app

# RUN npm install -g @angular/cli

# COPY ./package.json .
# RUN npm install
# COPY . .
# ENV NODE_OPTIONS=--max_old_space_size=4096
# # EXPOSE 4200
# RUN ng build

# FROM nginx:1.17.1-alpine
# COPY /deploy/nginx.conf /etc/nginx/nginx.conf
# COPY /dist/frontend /usr/share/nginx/html

# FROM nginx as runtime
# COPY --from=build /app/dist/frontend /usr/share/nginx/html



#stage 1
# FROM node:14 as build
# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# ENV NODE_OPTIONS=--max_old_space_size=4096
# EXPOSE 4200
# RUN npm run build --dev

# #stage 2
# FROM nginx:latest
# # Copy the build output to replace the default nginx contents.
# COPY --from=build-step /app/dist/frontend /usr/share/nginx/html

