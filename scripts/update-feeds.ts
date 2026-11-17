// RSSフィードから新着を取得し、src/data/blog-data.json に追記する。
// 使い方: npm run update-feeds
// GitHub Actions（.github/workflows/update-feeds.yml）から定期実行される。
import fs from "node:fs/promises";
import {
  fetchBlogPosts,
  fetchPresentations,
  mergeByUrl,
} from "../src/data/rss-fetcher.ts";

const dataFile = new URL("../src/data/blog-data.json", import.meta.url);

const withDates = <T extends { pubDate: string }>(items: T[]) =>
  items.map((item) => ({ ...item, pubDate: new Date(item.pubDate) }));

const cached = JSON.parse(await fs.readFile(dataFile, "utf-8"));

const [newBlogPosts, newPresentations] = await Promise.all([
  fetchBlogPosts(),
  fetchPresentations(),
]);

const blogPosts = mergeByUrl(withDates(cached.blogPosts), newBlogPosts);
const presentations = mergeByUrl(
  withDates(cached.presentations),
  newPresentations,
);

console.log(`ブログ記事: ${blogPosts.items.length}件（新着 ${blogPosts.added}件）`);
console.log(
  `登壇情報: ${presentations.items.length}件（新着 ${presentations.added}件）`,
);

if (blogPosts.added + presentations.added === 0) {
  console.log("新着はありません。blog-data.json は変更しません。");
} else {
  await fs.writeFile(
    dataFile,
    JSON.stringify(
      {
        blogPosts: blogPosts.items,
        presentations: presentations.items,
        lastUpdated: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
  console.log("blog-data.json を更新しました。");
}
