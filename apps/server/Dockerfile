# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@9.6.0

# Copy all source files first
COPY . .

# Install dependencies
RUN pnpm install

# Build the application
RUN pnpm genAll && pnpm build 

# Production stage
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@9.6.0

# Copy package files and start script
COPY ./package.json ./
COPY ./start.sh ./
COPY ./prisma ./prisma
RUN chmod +x ./start.sh

# Install production dependencies only
RUN pnpm install --prod  && pnpm genAll

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000 3001
RUN ls -a
# Start the server
CMD ["/bin/sh", "./start.sh"] 