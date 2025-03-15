import { fetchBlogPosts, fetchPresentations } from "./rss-fetcher";

// RSSフィードから取得したブログ記事（ビルド時に実行）
export const blogPosts = await fetchBlogPosts();

// Speakerdeckから取得した登壇情報（ビルド時に実行）
export const latestPresentations = await fetchPresentations();

// フォールバック用のブログ記事（RSSからの取得に失敗した場合に使用）
export const fallbackBlogPosts = [
  {
    url: "https://www.pagerduty.co.jp/blog/11-event-driven-automation-tags/",
    title: "DevOpsチームのための自動化レシピ集：すぐに使える11の実践例",
    pubDate: new Date("2025-03-10"),
    source: "PagerDuty",
    sourceUrl: "https://www.pagerduty.co.jp/blog/",
  },
  {
    url: "https://www.pagerduty.co.jp/blog/pagerduty-innovation-2025/",
    title:
      "2025年の幕開け−より高度な運用管理を実現する、PagerDutyのイノベーション",
    pubDate: new Date("2025-02-15"),
    source: "PagerDuty",
    sourceUrl: "https://www.pagerduty.co.jp/blog/",
  },
  {
    url: "https://jaco.udcp.info/entry/2025/01/20/123456",
    title:
      "クラウドネイティブな環境におけるプラットフォームエンジニアリングの実践",
    pubDate: new Date("2025-01-20"),
    source: "Cloud Penguins",
    sourceUrl: "https://jaco.udcp.info/",
  },
];

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

// フォールバック用の登壇情報（Speakerdeckからの取得に失敗した場合に使用）
export const fallbackPresentations = [
  {
    url: "https://speakerdeck.com/jacopen/torasiyuanimaruninarou-kai-fa-zhe-dakarakosodekiru-an-ding-sitasabisuzuo-rinomi-jue",
    title:
      "トラシューアニマルになろう ～開発者だからこそできる、安定したサービス作りの秘訣～",
    pubDate: new Date("2025-03-01"),
  },
  {
    url: "https://speakerdeck.com/jacopen/anatanoxing-wei-haxin-lai-xing-soretomosheng-chan-xing-sretositenokiyarianinao-muminasamanichuan-etaixuan-ze-zhi",
    title:
      "あなたの興味は信頼性？それとも生産性？ SREとしてのキャリアに悩むみなさまに伝えたい選択肢",
    pubDate: new Date("2025-02-15"),
  },
  {
    url: "https://speakerdeck.com/jacopen/jian-wei-itarakenohosutomotemu-hontoniyi-li-turehiyuhakouta",
    title: "間違いだらけのポストモーテム – ホントに役立つレビューはこうだ！",
    pubDate: new Date("2025-01-20"),
  },
  {
    url: "https://speakerdeck.com/jacopen/ai-x-insidentoguan-li-dekuo-gerusabisuonasitupu",
    title: "AI x インシデント管理で拡げるサービスオーナーシップ",
    pubDate: new Date("2025-01-10"),
  },
];

// 実際に表示する登壇情報（動的に取得したものがあればそれを使用、なければフォールバックを使用）
export const presentations =
  latestPresentations.length > 0 ? latestPresentations : fallbackPresentations;
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
