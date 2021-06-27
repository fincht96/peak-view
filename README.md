# peak-view
A full stack web application that enables users to create and sign in to their account and log and view their Peak Expiratory Flow (PEF) readings.

# Architecture
An Express.js with Apollo-Server on the backend will provide support for interfacing to a PostgreSQL server. The frontend is powered by React via the Next.js framework. Authentication and Authorization will be faciliated by Google federated Sign In OAuth, negating the requirement for managing and storing user sign in credentials.  

# Development & Deployment
Each service is implemented in Docker containers and is orchestrated by Docker Compose. Docker Hub hosts the latest Docker images and Github Actions is used to implement CI/CD and tests the code against a linter and unit tests before pushing the latest images to Docker Hub. The production enviroment is hosted on a Digital Ocean Droplet and is served via NGINX. The production enviroment contains a watchtower container and will keep the docker images up to date with Docker Hub.      


# Planning Document
See Google Doc: https://docs.google.com/document/d/12omxQm3lOl07tmHQc7-asemnKPaaRVxeHa4zPow1GW8/edit?usp=sharing

