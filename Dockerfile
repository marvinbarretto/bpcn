# Stage 1: Build the Angular app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

# Stage 2: Serve the Angular browser build with Nginx
FROM nginx:1.23

# Copy the Angular browser build output to Nginx's web server directory
COPY --from=build /app/dist/bpcn/browser /usr/share/nginx/html

# Temporararily rename index.csr.html to index.html for Nginx to serve it as the entry point while we dont have SSR
RUN mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
