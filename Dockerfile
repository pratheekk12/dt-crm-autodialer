#FROM node:12-alpine

FROM httpd:2.4

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./build/ /usr/local/apache2/htdocs/
COPY ./build/ /usr/src/dist
COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf

# Bundle app source; you need to do this here, becuase typescript compilation requires files


#RUN npm install

#install typescript compiler

#RUN npm install -g typescript

#just see whether everything is there

RUN ls -al
# used from package.json

#RUN npm run build

# If you are building your code for production
#RUN npm ci --only=production


#ENV APP_SETTINGS_FILE_PATH '/usr/src/app/config/appSettings.json'

EXPOSE 80
#CMD ["npm", "start"]

