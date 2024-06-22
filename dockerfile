FROM node:20-bookworm-slim AS base
ENV NEXT_TELEMETRY_DISABLED="1"
RUN mkdir /app
WORKDIR /app

FROM base AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV OUTPUT_STANDALONE="1"
RUN sed -i 's@deb.debian.org@mirrors.ustc.edu.cn@g' /etc/apt/sources.list.d/debian.sources
RUN corepack enable
RUN apt update && apt install python3 build-essential
COPY . /app
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
ENV NODE_ENV="production"
COPY --from=build /app/.next/standalone .
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
ENV PORT 3000
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]