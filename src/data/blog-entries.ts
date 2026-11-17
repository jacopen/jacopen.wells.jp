import { fetchBlogPosts, fetchPresentations, mergeByUrl } from "./rss-fetcher";
import type { BlogPost, Presentation } from "./rss-fetcher";
import cachedData from "./blog-data.json";

export type { BlogPost, Presentation };

// コミット済みのキャッシュ（blog-data.json）を読み込む。
// このファイルは `npm run update-feeds` だけが書き換える。ビルドでは書き換えない。
const withDates = <T extends { pubDate: string }>(items: T[]) =>
  items.map((item) => ({ ...item, pubDate: new Date(item.pubDate) }));

let allBlogPosts: BlogPost[] = withDates(cachedData.blogPosts);
let allPresentationEntries: Presentation[] = withDates(cachedData.presentations);

// 本番ビルドでは最新のフィードをメモリ上でだけマージし、
// キャッシュ更新ジョブが走る前でも新着が載るようにする。
// フィード取得に失敗した場合はキャッシュの内容だけで表示する。
if (import.meta.env.PROD) {
  const [newBlogPosts, newPresentations] = await Promise.all([
    fetchBlogPosts(),
    fetchPresentations(),
  ]);
  allBlogPosts = mergeByUrl(allBlogPosts, newBlogPosts).items;
  allPresentationEntries = mergeByUrl(allPresentationEntries, newPresentations).items;
}

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
    url: "https://www.youtube.com/watch?v=bifQwjbdb1A",
    title: "なぜエンジニアは絶対に技術カンファレンスに行くべきなのか。",
  },
  {
    url: "https://www.youtube.com/watch?v=rg8mabGgFvc",
    title:
      "【ルームツアー!?】都内某所に怪しいサーバー部屋があると聞いたので潜入した結果 【自宅鯖界隈】",
  },
  {
    url: "https://levtech.jp/media/detail_953/",
    title: "趣味で25年続けた自宅サーバーが、手を動かす場所を守ってくれた話",
  },
  {
    url: "https://levtech.jp/media/detail_947/",
    title:
      "仮想化、Docker、Kubernetes、AI。自宅サーバーは25年で何が変わったのか",
  },
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

// すべてのブログ記事を提供する
export const blogPosts = allBlogPosts;

// すべての登壇情報を提供する
export const allPresentations = allPresentationEntries;

// 表示用に最新6件の登壇情報を提供する
export const presentations = allPresentationEntries.slice(0, 6);
