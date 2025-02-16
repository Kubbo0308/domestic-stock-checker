# syntax = docker/dockerfile:1

# ベースイメージの指定
ARG UBUNTU_VERSION=22.04
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-${UBUNTU_VERSION}

# タイムゾーンを 'Asia/Tokyo' へセット
RUN set -x \
  && ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
  && echo 'Asia/Tokyo' >/etc/timezone

# Bun インストール
# NOTE: デフォルトでは '/home/<ユーザ名>/.bun' にインストールされ、コンテナ起動時にエラーが発生するため、'/usr' 以下へインストールするよう指定
# 参考: https://stackoverflow.com/questions/77110962/bun-not-found-in-docker-trying-to-do-split-base-build-image
RUN set -x \
  && curl -fsSL https://bun.sh/install | BUN_INSTALL=/usr bash

# devcontainer上で使用するユーザ（'vscode'）を指定
ARG USERNAME=docker
USER ${USERNAME}

# devcontainer起動時の作業ディレクトリを指定
WORKDIR /app

# 'node_modules'ディレクトリを作成
RUN mkdir node_modules

# コンテナ起動時のデフォルトコマンドにbashを設定
CMD ["/bin/bash"]