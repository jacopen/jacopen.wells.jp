import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { blogPosts as rssBlogPosts } from '../data/blog-entries';
import { profileInfo } from '../data/profile-content';

export const GET: APIRoute = async () => {
  // Markdownブログ記事の取得
  const mdBlogEntries = await getCollection('blog');

  // Markdownブログ記事をblogPostsと同じ形式に変換
  const mdBlogPosts = mdBlogEntries.map((entry) => ({
    url: `https://jacopen.wells.jp/blog/${entry.slug}`,
    title: entry.data.title,
    pubDate: entry.data.pubDate,
    source: 'ブログ',
    sourceUrl: 'https://jacopen.wells.jp/blog',
    description: entry.data.description || '',
  }));

  // RSSブログ記事のURLを絶対URLに変換
  const absoluteRssBlogPosts = rssBlogPosts.map((post) => ({
    ...post,
    url: post.url.startsWith('http') ? post.url : `https://jacopen.wells.jp${post.url}`,
  }));

  // 全ブログ記事を結合してソート
  const allBlogPosts = [...absoluteRssBlogPosts, ...mdBlogPosts]
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    .slice(0, 20); // 最新20件に制限

  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${profileInfo.nameEn} (@${profileInfo.nickname}) - ブログ</title>
    <link>https://jacopen.wells.jp/</link>
    <description>${profileInfo.bio}</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://jacopen.wells.jp/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>noreply@jacopen.wells.jp (${profileInfo.nameEn})</managingEditor>
    <webMaster>noreply@jacopen.wells.jp (${profileInfo.nameEn})</webMaster>
    <generator>Astro</generator>
    <image>
      <url>https://jacopen.wells.jp/pen_pen.jpg</url>
      <title>${profileInfo.nameEn} (@${profileInfo.nickname}) - ブログ</title>
      <link>https://jacopen.wells.jp/</link>
    </image>
${allBlogPosts
  .map(
    (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.url}</link>
      <guid>${post.url}</guid>
      <pubDate>${post.pubDate.toUTCString()}</pubDate>
      <description><![CDATA[${post.description || post.title} - ${post.source}より]]></description>
      <source url="${post.sourceUrl}">${post.source}</source>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`;

  return new Response(rssContent, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // 1時間キャッシュ
    },
  });
};