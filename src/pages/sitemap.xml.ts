import type { APIRoute } from "astro";
import { sanityClient } from "sanity:client";
import { blogPosts, presentations } from "../data/blog-entries";

export const GET: APIRoute = async () => {
  const siteUrl = "https://jacopen.wells.jp";
  const currentDate = new Date().toISOString();

  // Sanityから内部ブログ記事を取得
  const posts = await sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc)`
  );

  // メインページのURLリスト
  const staticPages = [
    {
      url: `${siteUrl}/`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      url: `${siteUrl}/blog/`,
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.9",
    },
    {
      url: `${siteUrl}/presentations/`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.6",
    },
  ];

  // 内部ブログ投稿のURL生成（外部記事は除外）
  const blogUrls = posts.map((post: any) => ({
    url: `${siteUrl}/blog/${post.slug.current}`,
    lastmod: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : currentDate,
    changefreq: "monthly",
    priority: "0.7",
  }));

  // ブログページネーションのURL生成（全ブログ投稿数を使用）
  const postsPerPage = 10;
  const totalBlogPages = Math.ceil(blogPosts.length / postsPerPage);
  const blogPaginationUrls = Array.from({ length: totalBlogPages }, (_, i) => ({
    url: `${siteUrl}/blog/page/${i + 1}`,
    lastmod: currentDate,
    changefreq: "daily",
    priority: i === 0 ? "0.9" : "0.6",
  }));

  // プレゼンテーションページネーションのURL生成
  const totalPresentationPages = Math.ceil(presentations.length / postsPerPage);
  const presentationPaginationUrls = Array.from(
    { length: totalPresentationPages },
    (_, i) => ({
      url: `${siteUrl}/presentations/page/${i + 1}`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: i === 0 ? "0.8" : "0.6",
    })
  );

  // RSSフィードのURL
  const feedUrls = [
    {
      url: `${siteUrl}/feed.xml`,
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.5",
    },
    {
      url: `${siteUrl}/atom.xml`,
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.5",
    },
  ];

  // 全URLを結合
  const allUrls = [
    ...staticPages,
    ...blogUrls,
    ...blogPaginationUrls,
    ...presentationPaginationUrls,
    ...feedUrls,
  ];

  // XMLサイトマップ生成
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // 1時間キャッシュ
    },
  });
};
