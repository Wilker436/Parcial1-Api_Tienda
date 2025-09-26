# Etapa 1: Build de la app
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine
COPY --from=builder /app/www/ /usr/share/nginx/html
EXPOSE 80