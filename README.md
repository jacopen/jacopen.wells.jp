# jacopen.wells.jp

Kazuto Kusama (@jacopen) のポートフォリオサイトです。

**URL**: https://jacopen.wells.jp

## 技術スタック

- [Astro](https://astro.build/) 5.x - 静的サイトジェネレーター
- [TailwindCSS](https://tailwindcss.com/) 4.x - CSSフレームワーク
- [Sanity](https://www.sanity.io/) - ヘッドレスCMS（ブログ記事管理）

## プロジェクト構造

```
/
├── public/              # 静的アセット
├── sanity/              # Sanity CMS設定
├── scripts/             # ユーティリティスクリプト
├── src/
│   ├── assets/          # 画像等のアセット
│   ├── components/      # Astroコンポーネント
│   ├── data/            # データファイル・RSSフェッチャー
│   ├── layouts/         # レイアウトコンポーネント
│   ├── pages/           # ルーティング
│   └── styles/          # グローバルスタイル
└── package.json
```

## コマンド

| コマンド | 説明 |
|:--|:--|
| `npm install` | 依存関係のインストール |
| `npm run dev` | 開発サーバー起動 (localhost:4321) |
| `npm run build` | 本番ビルド (./dist/) |
| `npm run preview` | ビルドしたサイトのプレビュー |
| `npm run update-feeds` | RSSの新着を `src/data/blog-data.json` に追記 |

## 主な機能

### コンテンツ

- **プロフィール**: スキル、経歴、コミュニティ活動、書籍、コントリビューション
- **ブログ**: Sanity CMSの記事 + RSSで集約した外部記事
- **プレゼンテーション**: 登壇資料一覧

### RSS集約

複数のRSSフィードから記事を取得し、`src/data/blog-data.json` にキャッシュ。GitHub Actionsが毎日 `npm run update-feeds` を実行して新着をコミットする。本番ビルドでも最新フィードをメモリ上でマージする：
- PagerDuty ブログ
- 個人ブログ
- Qiita

### 生成ファイル

- `/feed.xml` - RSS 2.0フィード
- `/atom.xml` - Atomフィード
- `/sitemap.xml` - サイトマップ
- `/llms.txt` - LLM向けコンテンツ情報
- `/robots.txt`

## 開発

### ブログ記事の作成

Sanity Studioで記事を作成します。次回のビルドでサイトに反映されます。

### RSSキャッシュの更新

```sh
npm run update-feeds
```

RSSフィードの新着を `src/data/blog-data.json` に追記します。通常はGitHub Actions（`.github/workflows/update-feeds.yml`）が毎日実行します。

### プロフィール情報の更新

`src/data/profile-content.ts` でスキル、経歴、コミュニティ活動などのプロフィール情報を管理しています。

### Sanity CMS

ブログ記事はSanity CMSで管理しています。Sanity Studioは `sanity/` ディレクトリにあります。

```sh
cd sanity
npm install
npm run dev
```

## 環境変数

`.env.example` を参考に `.env` ファイルを作成してください。

```sh
cp .env.example .env
```

Sanity CMSを使用する場合は、プロジェクトID等の設定が必要です。
