FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Copy the Docker-specific env file
COPY .env.docker .env

# Build TypeScript to JavaScript
RUN npm run build

EXPOSE 7200

CMD ["npm", "start"]