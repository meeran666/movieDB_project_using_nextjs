# Stage 1: Build the application
FROM oven/bun:alpine AS builder

# Set the working directory
WORKDIR /home/node/app

# Copy dependency files
COPY package*.json ./
COPY bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the application files
COPY . .

# Build the application
RUN bun run build

# Stage 2: Create the final image
FROM oven/bun:alpine AS runner


# Set the working directory
WORKDIR /home/node/app

# Copy only the built files from the builder stage
COPY --from=builder /home/node/app/.next/standalone ./
COPY --from=builder /home/node/app/.next/static ./.next/static
COPY --from=builder /home/node/app/public ./public