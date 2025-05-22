# Dockerfile

# Use a Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the app port (optional if not running directly)
EXPOSE 3000

# Run the app
CMD ["node", "dist/main.js"]
