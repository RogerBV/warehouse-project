# ========== Stage of dependencies ==========
FROM node:22.19.0-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

# ========== Stage of development ==========
FROM node:22.19.0-alpine AS dev

WORKDIR /app

# Re use node_modules of previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY . .

CMD ["npm", "run", "start:dev"]