FROM node:12.19.0-alpine
RUN mkdir -p /usr/src/app/src
WORKDIR /usr/src/app
# copying all the files from your file system to container file system
COPY package.json .
# install all dependencies
RUN npm install
# copy other files as well
COPY ./src/ ./src/
#expose the port
EXPOSE 4000
# run the app
# command to run when intantiate an image
CMD ["npm","start"]