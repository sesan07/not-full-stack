# Stage 1 - Build Angular
# Use official node image as the base image
FROM node:14 as build

# Set the working directory
WORKDIR /app

# Bundle app source
COPY . .

# Install any needed packages
RUN npm i

# Build
RUN npm run build:prod

# EXPOSE 4200

# Stage 2 - Build Nginx
# Use official nginx image as the base image
FROM nginx

# Copy custom conf file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy built angular app
COPY --from=build /app/dist/angular-app /usr/share/nginx/html

EXPOSE 81