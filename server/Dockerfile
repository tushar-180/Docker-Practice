# Use official Node image
FROM node:24-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

#curl
RUN apk add --no-cache curl

# Copy all files
COPY . .

# Expose port
EXPOSE 5000

# Start app
CMD ["npm", "run", "dev"]