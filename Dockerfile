# Use official Node.js LTS image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your project files
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the port your app uses (5000 from your config)
EXPOSE 5000

# Start the app using the compiled JS file
CMD ["node", "dist/index.js"]
