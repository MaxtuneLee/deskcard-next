# Use the slim version of Node.js 20 as the base image
FROM node:20-slim AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies and build the application
FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
ENV NEXT_TELEMETRY_DISABLED 1
ENV OUTPUT_STANDALONE 1
# Use the npm mirror to speed up the installation
RUN pnpm config set registry https://registry.npmmirror.com && pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Install production dependencies only
RUN pnpm install --prod --ignore-scripts --prefer-offline

FROM node:20-slim AS runner
WORKDIR /app

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Copy the environment configuration
ARG CONFIG_FILE
COPY $CONFIG_FILE /app/.env.local

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

# Just pass HOSTNAME to node server.js
CMD HOSTNAME="0.0.0.0" node server.js
