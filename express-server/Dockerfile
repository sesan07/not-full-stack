# Use official node image as the base image
FROM node:16.10.0

# Set the working directory
WORKDIR /app

# Bundle app source
COPY . .

# Install any needed packages
RUN npm i

EXPOSE 3000

# Specify that the default command should be npm start
CMD [ "npm", "run", "start:dev" ]