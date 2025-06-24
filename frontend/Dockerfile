# Stage 1: Build React App
FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Debug: Confirm react-scripts exists
RUN ls -la node_modules/react-scripts || echo "react-scripts missing"

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Optional: serve with Nginx
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
