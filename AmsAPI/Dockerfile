FROM node:14.16.0-alpine3.13
RUN mkdir /home/code
WORKDIR /home/code
COPY --chown=node:node ./ ./
RUN npm install
CMD [ "npm", "start" ]
