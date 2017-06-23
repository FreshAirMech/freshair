FROM node:4-onbuild
MAINTAINER Jonathan Rim

# Install dependencies
RUN npm install

# Expose the app port
EXPOSE 3000

# Start the app
CMD npm start