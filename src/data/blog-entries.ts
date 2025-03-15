import { fetchBlogPosts, fetchPresentations } from "./rss-fetcher";
import fs from "fs/promises";
import path from "path";

// ファイルパスを構築（相対パスで明示的に指定）
const DATA_FILE_PATH = path.resolve(process.cwd(), "src/data/blog-data.json");

// 型定義
export type BlogPost = {
  url: string;
  title: string;
  pubDate: Date;
  source: string;
  sourceUrl: string;
};

export type Presentation = {
  url: string;
  title: string;
  pubDate: Date;
};

// JSONファイルがない場合の初期データは空の配列とする

// JSONファイルからデータを読み込む関数
async function loadDataFromFile(): Promise<{
  blogPosts: BlogPost[];
  presentations: Presentation[];
}> {
  try {
    const fileData = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsedData = JSON.parse(fileData);
    
    // 日付文字列をDateオブジェクトに変換
    const blogPosts = parsedData.blogPosts.map((post: any) => ({
      ...post,
      pubDate: new Date(post.pubDate),
    }));
    
    const presentations = parsedData.presentations.map((pres: any) => ({
      ...pres,
      pubDate: new Date(pres.pubDate),
    }));
    
    return { blogPosts, presentations };
  } catch (error) {
    console.log("JSONファイルの読み込みに失敗しました。デフォルトデータを使用します。", error);
    return {
      blogPosts: [],
      presentations: [],
    };
  }
}

// データをJSONファイルに保存する関数
async function saveDataToFile(blogPosts: BlogPost[], presentations: Presentation[]) {
  try {
    const data = {
      blogPosts,
      presentations,
      lastUpdated: new Date().toISOString(),
    };
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
    console.log("データをJSONファイルに保存しました");
  } catch (error) {
    console.error("JSONファイルの保存に失敗しました", error);
  }
}

// 保存済みのブログ記事データと登壇情報データ
export let savedBlogPosts: BlogPost[] = [];
export let savedPresentations: Presentation[] = [];

// 初期化時にJSONファイルからデータを読み込む
const initializeData = async () => {
  const loadedData = await loadDataFromFile();
  savedBlogPosts = loadedData.blogPosts;
  savedPresentations = loadedData.presentations;
};

// 初期化を実行
await initializeData();

// RSSから新しいデータを取得してマージし、JSONファイルに保存する関数
export async function updateBlogEntries() {
  try {
    // ブログ記事を取得
    const newBlogPosts = await fetchBlogPosts();
    // 登壇情報を取得
    const newPresentations = await fetchPresentations();

    let dataUpdated = false;

    // ブログ記事をマージ（URLをキーとして重複を排除）
    if (newBlogPosts.length > 0) {
      // 既存のURLのマップを作成
      const existingUrls = new Map(savedBlogPosts.map(post => [post.url, true]));
      
      // 新しい記事で重複しないものだけを追加
      newBlogPosts.forEach(post => {
        if (!existingUrls.has(post.url)) {
          savedBlogPosts.push(post);
          dataUpdated = true;
        }
      });
      
      // 日付順に並べ替え
      savedBlogPosts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
    }

    // 登壇情報をマージ（URLをキーとして重複を排除）
    if (newPresentations.length > 0) {
      // 既存のURLのマップを作成
      const existingUrls = new Map(savedPresentations.map(presentation => [presentation.url, true]));
      
      // 新しい登壇情報で重複しないものだけを追加
      newPresentations.forEach(presentation => {
        if (!existingUrls.has(presentation.url)) {
          savedPresentations.push(presentation);
          dataUpdated = true;
        }
      });
      
      // 日付順に並べ替え
      savedPresentations.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
    }

    // データが更新された場合のみJSONファイルに保存
    if (dataUpdated) {
      await saveDataToFile(savedBlogPosts, savedPresentations);
    }

    console.log(`ブログ記事: ${savedBlogPosts.length}件`);
    console.log(`登壇情報: ${savedPresentations.length}件`);
  } catch (error) {
    console.error("データの更新に失敗しました:", error);
  }
}

// ビルド時に実行: 新しいデータを取得してマージし、JSONファイルに保存
await updateBlogEntries();

// 書籍データ（変更なし）
export const books = [
  {
    url: "https://book.impress.co.jp/books/1121101117",
    title: "入門Terraform クラウド時代のインフラ統合管理",
  },
  {
    url: "https://techbookfest.org/product/h21RurMmFNU2Aee7Kg8Hh4?productVariantID=k2eLkqZic28carLXArVy6M",
    title: "ちいさく始めるプラットフォームエンジニアリング",
  },
  {
    url: "https://nextpublishing.jp/book/17823.html",
    title: "Kubernetes Secret管理入門 HashiCorp Vaultで実現するセキュアな運用",
  },
  {
    url: "https://techbookfest.org/product/qunTLHG5hLbL91bBX9dqDU?productVariantID=diV811bQsBeU5YfWhtGym0",
    title: "Real World Platform Engineering: 現場の知恵とノウハウ",
  },
];

// 寄稿/メディア記事データ（変更なし）
export const contributions = [
  {
    url: "https://thinkit.co.jp/article/14044",
    title:
      "Kubernetes、PaaS、Serverlessのどれを選ぶのか？ 機能比較と使い分けのポイント",
  },
  {
    url: "https://enterprisezine.jp/article/corner/621",
    title: "システム障害管理の効率化──AIOpsへの道筋一覧",
  },
  {
    url: "https://codezine.jp/article/corner/990",
    title:
      "プラットフォームづくりを成功に導く！開発者のための「Platform Engineering」入門一覧",
  },
  {
    url: "https://codezine.jp/article/detail/19221",
    title:
      "サービス危機を解決へと導く「インシデントコマンダー」の役割とは？ 組織で取り組むインシデント対応と戦術",
  },
  {
    url: "https://atmarkit.itmedia.co.jp/ait/series/16443/",
    title: "草間一人×青山真也 クラウドネイティブ対談",
  },
  {
    url: "https://atmarkit.itmedia.co.jp/ait/articles/2302/21/news006.html",
    title:
      "草間氏が語るクラウドネイティブ推進のための視点　「リリース間隔を短くしたいなら会議の削減も大切」の理由とは？",
  },
  {
    url: "https://techtarget.itmedia.co.jp/tt/series/2931/",
    title: "IT部門もアジャイル、DevOpsで行こう",
  },
  {
    url: "https://atmarkit.itmedia.co.jp/ait/series/28923/",
    title: "DXに悩むITマネジャーにささげる！ クラウドネイティブ講座",
  },
  {
    url: "https://atmarkit.itmedia.co.jp/ait/articles/2006/01/news033.html",
    title: "「Kubernetes-native」へと舵を切るCloud Foundry、その理由と展望は？",
  },
  {
    url: "https://techtarget.itmedia.co.jp/tt/news/1710/11/news01.html",
    title:
      "クラウド移行後に取り組みたい、「コンテナ」「アプリプラットフォーム」「サーバレス」って何？",
  },
  {
    url: "https://thinkit.co.jp/article/18294",
    title: "最高のオンラインカンファレンスを目指して 〜CloudNative Daysの挑戦",
  },
  {
    url: "https://thinkit.co.jp/article/22149",
    title:
      "CI/CD Conference 2023から、HashiCorpのエンジニアがCI/CDにおけるシークレット管理のコツを解説",
  },
];

// 表示用に半年以内のブログ記事をフィルタリングして提供する
export const blogPosts = (() => {
  // 半年（180日）前の日付を計算
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 180);
  
  // 半年以内のエントリーだけをフィルタリング
  return savedBlogPosts.filter(post => post.pubDate >= sixMonthsAgo);
})();

// 表示用に最新6件の登壇情報を提供する
export const presentations = savedPresentations.slice(0, 6);
