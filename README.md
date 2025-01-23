# STUDY RECORDS -- React + Vite

学習の記録ができるアプリです。
記録はデータベースに保存され、追加・削除を行うことができます。

## 主な機能

学習記録の追加・削除
記録時間の合計

## 技術スタック

・React
・VITE
・SUPABASE
・Firebase
・Jest
・react-testing-library
・GithubActions

## 環境設定 (.env ファイル)

SUPABASE の環境設定の方法

1. SUPABASE に「study-record」という名前でプロジェクトを作成
2. プロジェクトの setting から API を選択
3. .env ファイルに以下２つの環境変数を記載
4. 「VITE_SUPABASE_URL」に Project URL を設定
5. 「VITE_SUPABASE_ANON_KEY」に Project API Keys の anon key を設定

## 起動方法

このアプリをローカル環境で動かすには、以下の手順を実行してください。

### 1. 前提条件

- **Node.js** がインストールされている必要があります（バージョン 16 以上を推奨）。
- **npm** または **yarn** が使える状態であることを確認してください。

### 2. リポジトリのクローン

リポジトリをクローンします:

```bash
git clone https://github.com/ccc-chi/recordsAppV2.git
cd recordsAppV2
```

### 3. 必要なパッケージのインストール

```bash
npm install
```

### 4. 開発サーバーの起動

```bash
npm run dev
```
