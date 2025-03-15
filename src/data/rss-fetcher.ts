import Parser from "rss-parser";

type CustomItem = {
  title: string;
  link: string;
  pubDate: string;
  source?: string;
};

type CustomFeed = {
  items: CustomItem[];
};

type BlogPost = {
  url: string;
  title: string;
  pubDate: Date;
  source: string;
  sourceUrl: string;
};

type Presentation = {
  url: string;
  title: string;
  pubDate: Date;
};

// RSSフィードからブログ記事を取得する関数
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const parser: Parser<CustomFeed, CustomItem> = new Parser({
      customFields: {
        item: [
          ["title", "title"],
          ["link", "link"],
          ["pubDate", "pubDate"],
        ],
      },
    });

    // 両方のフィードを並行して取得
    const [pagerDutyFeed, personalBlogFeed] = await Promise.allSettled([
      parser.parseURL("https://www.pagerduty.co.jp/author/jacopen/feed/"),
      parser.parseURL("https://jaco.udcp.info/feed"),
    ]);

    let allPosts: BlogPost[] = [];

    // PagerDutyブログの記事を追加
    if (pagerDutyFeed.status === "fulfilled") {
      const pagerDutyPosts = pagerDutyFeed.value.items.map((item) => ({
        url: item.link,
        title: item.title,
        pubDate: new Date(item.pubDate || Date.now()),
        source: "PagerDuty",
        sourceUrl: "https://www.pagerduty.co.jp/blog/",
      }));
      allPosts = [...allPosts, ...pagerDutyPosts];
    } else {
      console.error(
        "PagerDutyのRSSフィードの取得に失敗しました:",
        pagerDutyFeed.reason,
      );
    }

    // 個人ブログの記事を追加
    if (personalBlogFeed.status === "fulfilled") {
      const personalPosts = personalBlogFeed.value.items.map((item) => ({
        url: item.link,
        title: item.title,
        pubDate: new Date(item.pubDate || Date.now()),
        source: "Cloud Penguins",
        sourceUrl: "https://jaco.udcp.info/",
      }));
      allPosts = [...allPosts, ...personalPosts];
    } else {
      console.error(
        "個人ブログのRSSフィードの取得に失敗しました:",
        personalBlogFeed.reason,
      );
    }

    // 半年以内（180日）のエントリーだけをフィルタリング
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 180);

    allPosts = allPosts.filter((post) => post.pubDate >= sixMonthsAgo);

    // 日付順（新しい順）に並べ替え
    allPosts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

    return allPosts;
  } catch (error) {
    console.error("RSSフィードの取得に失敗しました:", error);

    // エラー時はフォールバックとして空の配列を返す
    return [];
  }
}

// Speakerdeckのアトムフィードから登壇情報を取得する関数
export async function fetchPresentations(): Promise<Presentation[]> {
  try {
    const parser: Parser<CustomFeed, CustomItem> = new Parser({
      customFields: {
        item: [
          ["title", "title"],
          ["link", "link"],
          ["pubDate", "pubDate"],
        ],
      },
    });

    // Speakerdeckのフィードを取得
    const feedResult = await parser.parseURL(
      "https://speakerdeck.com/jacopen.atom",
    );

    // 取得したフィードから登壇情報を抽出
    const presentations = feedResult.items.map((item) => ({
      url: item.link,
      title: item.title,
      pubDate: new Date(item.pubDate || Date.now()),
    }));

    // 日付順（新しい順）に並べ替え
    presentations.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

    // 最新6件を取得
    return presentations.slice(0, 6);
  } catch (error) {
    console.error("Speakerdeckフィードの取得に失敗しました:", error);

    // エラー時はフォールバックとして空の配列を返す
    return [];
  }
}
