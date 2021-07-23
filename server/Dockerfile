FROM node:14 as base

# Create work directory
WORKDIR usr/src/app

# Copies package.json and package-lock.json
COPY package*.json .

# Installs packages
RUN npm install

# Bundle app source
COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

CMD wait && npm run start
