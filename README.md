# 企業健康度チェッカー
![checker_logo_purple_916](https://github.com/user-attachments/assets/35a3ca73-c28e-4565-9777-04a96fde14e6)

企業の財務データを分析し、健全度をスコアで可視化する Web アプリケーションです。

## 🔍 概要

ユーザーが証券コードを入力すると、該当企業の財務情報（収益、EPS、ROA、総資産、CF など）をスクレイピングして取得し、
9 つの指標からスコアを算出し、健康度を 100 点満点で表示します。

## ✨ 主な機能

- 証券コードによる企業検索
- 財務指標のグラフ可視化
- 健康スコアの表示（視覚的なプログレスバー）
- レスポンシブデザイン対応（スマホ・PC）

## 🚀 ローカル開発の始め方

```sh
make cc       # コンテナイメージのビルド
make up       # 開発環境の起動
```

開発環境は `http://localhost:3000` にてアクセスできます。

## 🛠️ 使用技術
![teckstack](https://github.com/user-attachments/assets/7140825a-1a17-4835-abf6-57ba5adde5a4)

- Frontend:
  - Bun
  - Vite
  - TypeScript
  - React
  - Tailwind CSS
  - Nginx (Cloud Run 上で静的配信)
- Backend:
  - Go
  - Gin
  - Colly
- Infrastructure:
  - Google Cloud Run
  - Google Artifact Registry
  - Google Cloud Storage
  - GitHub Actions
- IaC:
  - Terraform

## ☁️ インフラ構成

![diagram-export-2025-4-18-14_54_07](https://github.com/user-attachments/assets/63fd630d-e8a9-46e5-8138-439f179b9a2b)

使用サービス

- Google Cloud Run（フロントエンド+バックエンド Sidecar）
- Artifact Registry（Docker イメージ管理）
- Cloud Storage（tfstate 管理）
- GitHub Actions（CI/CD）
- Terraform（インフラ管理）

### 🌐 デプロイ（自動）

main ブランチへのマージ時に GitHub Actions が発火し、以下が実行されます：

- Docker イメージのビルドと Artifact Registry への Push
- Terraform による Cloud Run デプロイ

## 🗓️ 今後の展望

- API リトライ処理の強化
- スコアアルゴリズムの改善（複数年の傾向分析）
- パフォーマンス最適化（Lighthouse 対応）
- SNS 共有機能の追加

## 🧑‍💻 開発者

Created by [@Kubbo0308](https://github.com/Kubbo0308)

## 📬 お問い合わせ

バグ報告・改善提案などお気軽にどうぞ！
→ [GitHub Issues](https://github.com/Kubbo0308/domestic-stock-checker/issues)

## 📄 ライセンス

MIT License
