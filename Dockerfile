# DSAPilot - React Native Expo Web App
# Multi-stage Dockerfile for building and serving via Expo Web

# ---- Stage 1: Dependencies ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# ---- Stage 2: Build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx expo export --platform web

# ---- Stage 3: Serve ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install a lightweight static server
RUN npm install -g serve@14

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
