# Use official node image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Bundle app source
COPY . .

# Install any needed packages
RUN npm ci

# TODO use entrypoint instead
# Specify that the default command should be npm start
CMD [ "npm", "start" ]