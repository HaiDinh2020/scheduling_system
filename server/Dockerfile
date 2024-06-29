# FROM node:alpine
# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# COPY ./ ./
# RUN npm i

# EXPOSE 5000
# CMD ["npm", "run", "start"]

# /server/Dockerfile
FROM node:alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE 5000
CMD ["npm", "run", "start"]
