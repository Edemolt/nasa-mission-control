# Use a Node.js base image
FROM node:20-alpine

# Set working directory for the server
WORKDIR /app/server

# Copy server package.json and install dependencies
COPY server/package*.json ./
RUN npm install

# Set working directory for the client
WORKDIR /app/client

# Copy client package.json and install dependencies
COPY client/package*.json ./
RUN npm install

# Copy the rest of the server and client code
WORKDIR /app
COPY . .

# Build the client
RUN npm run build --prefix client

# Expose the port on which the server runs
EXPOSE 8000

# Set the command to start both server and client
CMD ["npm", "run", "deploy"]
