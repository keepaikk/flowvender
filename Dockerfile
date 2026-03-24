# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy project files and build
COPY . .
RUN npm run build

# Stage 2: Serve the resulting app with Nginx
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config with our SPA-enabled configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start server
CMD ["nginx", "-g", "daemon off;"]
