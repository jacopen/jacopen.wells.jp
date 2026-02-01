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
│   ├── content/         # コンテンツコレクション（ブログ記事）
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
| `npm run new-blog` | 新しいブログ記事を作成 |

## 主な機能

### コンテンツ

- **プロフィール**: スキル、経歴、コミュニティ活動、書籍、コントリビューション
- **ブログ**: ローカルMarkdown記事 + Sanity CMSからの記事
- **プレゼンテーション**: 登壇資料一覧

### RSS集約

複数のRSSフィードから記事を自動取得してビルド時に統合：
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

```sh
npm run new-blog
```

対話形式で新しいブログ記事のテンプレートを `src/content/blog/` に作成します。

### プロフィール情報の更新

`src/data/profile-content.ts` でスキル、経歴、コミュニティ活動などのプロフィール情報を管理しています。

### Sanity CMS

ブログ記事の一部はSanity CMSで管理しています。Sanity Studioは `sanity/` ディレクトリにあります。

```sh
cd sanity
npm install
npm run dev
```

## バージョン管理

このリポジトリは [Jujutsu (jj)](https://github.com/martinvonz/jj) でのバージョン管理を推奨しています。

```sh
jj new          # 新しい変更を作成
jj git push     # リモートにプッシュ
```

通常のGitコマンドも使用可能です。

## 環境変数

`.env.example` を参考に `.env` ファイルを作成してください。

```sh
cp .env.example .env
```

Sanity CMSを使用する場合は、プロジェクトID等の設定が必要です。
