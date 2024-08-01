# Build stage
FROM node:18-alpine as build

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy pnpm-lock.yaml in addition to package.json
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]