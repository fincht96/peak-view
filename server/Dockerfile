FROM node:14

# Create work directory
WORKDIR usr/src/app

# Copies package.json and package-lock.json
COPY package*.json .

# Installs packages
RUN npm install

# Bundle app source
COPY . .


EXPOSE 8080


CMD ["npm", "run", "start"]

