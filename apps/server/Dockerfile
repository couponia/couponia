# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@10.5.2

# Copy package files
COPY package.json ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm build && pnpm genAll

# Production stage
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@10.5.2

# Copy package files
COPY package.json ./

# Install production dependencies only
RUN pnpm install --prod

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/start.sh ./start.sh
COPY --from=builder /app/prisma ./prisma
RUN chmod +x ./start.sh

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the server
CMD ["./start.sh"] 