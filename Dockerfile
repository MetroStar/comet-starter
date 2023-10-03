# Stage 1: Build the React app
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app to the working directory
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built app using a lightweight web server
FROM nginx:1.21

# Copy the built app from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the default Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
