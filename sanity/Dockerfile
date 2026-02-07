# Stage 1: Build Sanity Studio
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx sanity build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Add .mjs MIME type and configure SPA routing
RUN printf 'types {\n\
    application/javascript mjs;\n\
}\n\
server {\n\
    listen 3333;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 3333

CMD ["nginx", "-g", "daemon off;"]
