#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 現在の日付を取得してフォーマット
const today = new Date();
const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD形式

// 新しいブログ記事のテンプレート
const createTemplate = (title, description, tags) => {
  return `---
title: "${title}"
pubDate: "${dateString}"
description: "${description}"
author: "Kazuto Kusama"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
---

# ${title}

ここに本文を書きます。このテンプレートから始めて、Markdownで記事を書いていきましょう。

## セクション1

本文...

## セクション2

本文...

## まとめ

結論や今後の展望などをまとめます。
`;
};

// 入力を受け取る関数
const askQuestion = (query) => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => resolve(answer));
  });
};

// メイン処理
async function main() {
  console.log('新しいブログ記事を作成します。');
  
  const title = await askQuestion('タイトルを入力してください: ');
  const slug = await askQuestion('スラッグを入力してください（例: my-new-post）: ');
  const description = await askQuestion('記事の説明を入力してください: ');
  const tagsInput = await askQuestion('タグをカンマ区切りで入力してください: ');
  
  // タグの処理
  const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
  
  // ファイルパスの生成
  const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');
  const filePath = path.join(contentDir, `${slug}.md`);
  
  // ディレクトリの存在確認
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
    console.log(`ディレクトリを作成しました: ${contentDir}`);
  }
  
  // ファイルの存在確認
  if (fs.existsSync(filePath)) {
    const overwrite = await askQuestion('同名のファイルが既に存在します。上書きしますか？(y/n): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('処理を中止しました。');
      rl.close();
      return;
    }
  }
  
  // ファイルの作成
  fs.writeFileSync(filePath, createTemplate(title, description, tags));
  console.log(`ブログ記事を作成しました: ${filePath}`);
  console.log(`ブラウザで確認するURL: http://localhost:4322/blog/${slug}`);
  
  rl.close();
}

main().catch(err => {
  console.error('エラーが発生しました:', err);
  rl.close();
});
