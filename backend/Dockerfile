FROM node:18-alpine
WORKDIR /app
# Usamos pnpm, que es el gestor de paquetes de tu proyecto
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
