#FROM node:16-alpine as builder
## Set the working directory to /app inside the container
#WORKDIR /app
## Copy app files
#COPY . .
#
#RUN npm install typescript -g
## Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
#RUN npm ci
## Build the app
#RUN npm run build
#
## Bundle static assets with nginx
#FROM nginx:1.21.0-alpine as production
#ENV NODE_ENV production
## Copy built assets from `builder` image
#COPY --from=builder /app/build /usr/share/nginx/html
## Add your nginx.conf
#COPY nginx.conf /etc/nginx/conf.d/default.conf
## Expose port
#EXPOSE 80
## Start nginx
#CMD ["nginx", "-g", "daemon off;"]

FROM node:16-alpine
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000

RUN npm install -g serve
# Start the app
CMD serve build
