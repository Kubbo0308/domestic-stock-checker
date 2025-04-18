# syntax = docker/dockerfile:1

#####################################
# dev stage
#####################################
ARG UBUNTU_VERSION=22.04
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-${UBUNTU_VERSION} AS dev

# タイムゾーン設定（rootで）
RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
  echo 'Asia/Tokyo' > /etc/timezone

# vscodeユーザー用に bun をホームにインストール
ARG USERNAME=vscode
USER ${USERNAME}

# bun をユーザーのホームにインストール
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/home/${USERNAME}/.bun/bin:$PATH"

WORKDIR /app

# 依存インストール（ホストからマウントされる前提で最低限）
COPY --chown=${USERNAME}:${USERNAME} bun.lock package.json ./
RUN bun install

# Vite dev サーバ起動
EXPOSE 3000
CMD ["bun", "run", "dev"]

#####################################
# build stage
#####################################
FROM oven/bun:1.2.2 AS builder
WORKDIR /app

# Install dependencies (optionally add --production to skip devDependencies if build tools are in prod deps)
COPY package.json bun.lock ./
# use --production if possible to avoid dev-only deps&#8203;:contentReference[oaicite:2]{index=2}
RUN bun install

# Copy source and build the app
COPY . .
# ensure production build optimizations
ENV NODE_ENV=production
# this runs "vite build", outputting to /app/dist
RUN bun run build

#####################################
# runner stage
#####################################
FROM nginx:alpine AS runner
# 環境変数展開用に envsubst をインストール
RUN apk add --no-cache gettext
# Copy build output to nginx's web root
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
RUN apk add --no-cache net-tools && netstat -tuln

ENV PORT=80
CMD ["/bin/sh", "-c", "envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
